import path from "node:path";
import { pathToFileURL } from "node:url";
import type { ExtendedSidebarItem, RootSidebarItem, SidebarConfigData, SidebarItem } from "./types";
import { slugify } from "./utils/string";

export class SidebarConfig {
	#docsRoot: string;
	#originalSidebar: RootSidebarItem<SidebarItem>[];
	#sidebar: RootSidebarItem<ExtendedSidebarItem>[];

	constructor(docsRoot: string, sidebar: RootSidebarItem<SidebarItem>[]) {
		this.#docsRoot = docsRoot;
		this.#originalSidebar = sidebar;
		this.#sidebar = this.#createExtendedSidebar(this.#docsRoot, this.#originalSidebar);
	}

	get docsRoot() {
		return this.#docsRoot;
	}

	get sidebar() {
		return this.#sidebar;
	}

	/** Get all children as an array. */
	get flatChildren() {
		return this.#sidebar.flatMap(({ children }) => children);
	}

	getFirstItem(): ExtendedSidebarItem {
		return this.#sidebar.at(0)!.children.at(0)!;
	}

	findBySlugPath(slugPath: string): ExtendedSidebarItem | undefined {
		return this.#sidebar
			.flatMap((root) => root.children)
			.find((item) => item.slugPath === slugPath);
	}

	toJSON(): SidebarConfigData<SidebarItem> {
		return {
			docsRoot: this.#docsRoot,
			sidebar: this.#originalSidebar
		};
	}

	/** Loads a `sidebar.config.ts` file starting from root. */
	static async load(filePath: string = "sidebar.config.ts") {
		const absolutePath = path.resolve("./", filePath);
		const { docsRoot = "", sidebar }: SidebarConfigData<SidebarItem> = (
			await import(/* @vite-ignore */ pathToFileURL(absolutePath).href)
		).default;

		return new SidebarConfig(docsRoot, sidebar);
	}

	static fromJSON(json: SidebarConfigData<SidebarItem>): SidebarConfig {
		return new SidebarConfig(json.docsRoot ?? "", json.sidebar);
	}

	#createExtendedSidebar(
		docsRoot: string,
		sidebar: RootSidebarItem<SidebarItem>[]
	): RootSidebarItem<ExtendedSidebarItem>[] {
		const clone = structuredClone(sidebar);

		const withSlugs = clone.map((root) => {
			return {
				name: root.name,
				children: root.children.map((item, i) => {
					const slug = item.slug ?? slugify(item.name);
					const slugPath = [
						...item.path.replaceAll("\\", "/").split("/").slice(0, -1),
						slug
					]
						.join("/")
						.replaceAll("\\", "/")
						.replace(new RegExp("^" + docsRoot + "/"), "");

					return {
						...item,
						slug,
						slugPath
					} as ExtendedSidebarItem;
				})
			};
		});

		for (const [i, root] of withSlugs.entries()) {
			for (const [j, item] of root.children.entries()) {
				// @ts-ignore
				item.metadata = {};

				if (j > 0) {
					item.metadata.previous = root.children[j - 1];
				} else if (i > 0) {
					item.metadata.previous = withSlugs[i - 1].children.at(-1)!;
				} else {
					item.metadata.previous = null;
				}

				if (j < root.children.length - 1) {
					item.metadata.next = root.children[j + 1];
				} else if (i < withSlugs.length - 1) {
					item.metadata.next = withSlugs[i + 1].children[0];
				} else {
					item.metadata.next = null;
				}
			}
		}

		return withSlugs;
	}
}
