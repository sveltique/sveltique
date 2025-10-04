import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { capitalize, slugify } from "$utils/string";
import type { SidebarName } from "./constants";
import type { SidebarCategory, SidebarItem } from "./types";

/** Searches for a given `slugPath` in a `sidebar`. */
export function find(sidebar: SidebarCategory[], slugPath: string) {
	const [category, name] = slugPath.split("/", 2);

	return sidebar
		.find((c) => c.slugCategory === category)
		?.items.find((item) => item.slugName === name);
}

/** Loads the sidebar in a specific order. */
export async function loadSidebar(sidebar: SidebarName): ReturnType<typeof loadSidebarWithOrder> {
	const order =
		sidebar === "components"
			? ["getting-started", "configuration", "browse"]
			: ["getting-started", "browse"];

	return loadSidebarWithOrder(`./content/${sidebar}`, order);
}

/**
 * @param path The path to the sidebar.
 * @param order If given, will follow the given order of categories.
 */
export async function loadSidebarWithOrder(
	path: string,
	order: string[] = []
): Promise<SidebarCategory[]> {
	const categories = await readdir(path);

	const futureSidebar = categories.map(async (category) => {
		return {
			slugCategory: category,
			category: capitalize(category),
			items: await loadCategory(join(path, category))
		};
	});

	let sidebar = await Promise.all(futureSidebar);

	if (order.length > 0) {
		sidebar = orderSidebar(sidebar, order);
	}

	return addMetadata(sidebar);
}

/**
 * Recursively generate sidebar items from a directory.
 * @note It only supports a depth of two levels, one for the category and one for the content.
 * @note Sorts numerically first, with a `xx-sssss` pattern, and then alphabetically.
 */
async function loadCategory(path: string): Promise<SidebarItem[]> {
	const entries = await readdir(path, { withFileTypes: true });

	let items: SidebarItem[] = [];
	let nameOrders: { position: number; name: string; originalName: string }[] = [];

	for (const entry of entries) {
		if (entry.isDirectory()) continue;

		const filename = entry.name.split(".").at(0)!;

		// If true, uses the XX-NAME syntax
		// Which means we have to follow the specified order
		if (filename.includes("-")) {
			const [position, name] = filename.split("-", 2);

			nameOrders = [
				...nameOrders,
				{ position: Number(position), name, originalName: filename }
			].sort((a, b) => a.position - b.position);
		}

		items.push({
			name: filename,
			slugName: slugify(filename.split("-").at(-1)!),
			path: join(entry.parentPath, `./${entry.name}`),
			metadata: {
				previous: null,
				next: null
			}
		});
	}

	// Put ordered elements first, then sort alphabetically
	const orderedItems: SidebarItem[] = [];

	if (nameOrders.length > 0) {
		// It is already sorted properly
		for (const { originalName, name } of nameOrders) {
			const sidebarItem = items.find((item) => item.name === originalName)!;

			orderedItems.push({ ...sidebarItem, name });
			items = items.filter((item) => item.name !== originalName);
		}
	}

	orderedItems.push(...items);

	return orderedItems;
}

/** Orders the `sidebar` by the `slugCategories`. */
function orderSidebar(sidebar: SidebarCategory[], slugCategories: string[]) {
	return slugCategories.map((slugCategory) => {
		return sidebar.find((s) => s.slugCategory === slugCategory)!;
	});
}

/** Adds the metadata in place. */
function addMetadata(sidebar: SidebarCategory[]): SidebarCategory[] {
	for (const [i, category] of sidebar.entries()) {
		for (const [j, item] of category.items.entries()) {
			if (j > 0) {
				item.metadata.previous = {
					slugCategory: category.slugCategory,
					...category.items[j - 1]
				};
			} else if (i > 0) {
				item.metadata.previous = {
					slugCategory: sidebar[i - 1].slugCategory,
					...sidebar[i - 1].items.at(-1)!
				};
			} else {
				item.metadata.previous = null;
			}

			if (j < category.items.length - 1) {
				item.metadata.next = {
					slugCategory: category.slugCategory,
					...category.items[j + 1]
				};
			} else if (i < sidebar.length - 1) {
				item.metadata.next = {
					slugCategory: sidebar[i + 1].slugCategory,
					...sidebar[i + 1].items[0]
				};
			} else {
				item.metadata.next = null;
			}
		}
	}

	return sidebar;
}
