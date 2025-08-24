import fs from "node:fs";
import path from "node:path";
import type { SidebarConfigData, SidebarItem } from "./types";

/** A helper to define a sidebar config. */
export function defineConfig(
	fn: SidebarConfigData<SidebarItem> | (() => SidebarConfigData<SidebarItem>)
) {
	return typeof fn === "function" ? fn() : fn;
}

/**
 * Recursively generate sidebar items from a directory.
 * @note It only supports top-level files.
 */
export function fromFileSystem(dirPath: string, docsRoot: string = ""): SidebarItem[] {
	const entries = fs.readdirSync(path.join(docsRoot, dirPath), { withFileTypes: true });

	let items: SidebarItem[] = [];
	let nameOrders: { position: number; name: string; originalName: string }[] = [];

	for (const entry of entries) {
		// TODO : Support one day
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
			path: path.join(entry.parentPath, `./${entry.name}`),
			children: undefined
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
