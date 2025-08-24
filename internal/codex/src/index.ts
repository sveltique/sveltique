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

	public getFirstItem(): ExtendedSidebarItem {
		return this.#sidebar.at(0)!.children.at(0)!;
	}

	public findBySlugPath(slugPath: string): ExtendedSidebarItem | undefined {
		return this.#sidebar
			.flatMap((root) => root.children)
			.find((item) => item.slugPath === slugPath);
	}

	/** Loads a `sidebar.config.ts` file starting from root. */
	public static async load(filePath: string = "sidebar.config.ts") {
		const absolutePath = path.resolve("./", filePath);
		const { docsRoot = "", sidebar }: SidebarConfigData<SidebarItem> = (
			await import(/* @vite-ignore */ pathToFileURL(absolutePath).href)
		).default;

		return new SidebarConfig(docsRoot, sidebar);
	}

	public toJSON(): SidebarConfigData<SidebarItem> {
		return {
			docsRoot: this.#docsRoot,
			sidebar: this.#originalSidebar
		};
	}

	public static fromJSON(json: SidebarConfigData<SidebarItem>): SidebarConfig {
		return new SidebarConfig(json.docsRoot ?? "", json.sidebar);
	}

	#createExtendedSidebar(docsRoot: string, sidebar: RootSidebarItem<SidebarItem>[]) {
		const clone = structuredClone(sidebar);

		return clone.map((root) => {
			return {
				name: root.name,
				children: root.children.map((item) => {
					const slug = item.slug ?? slugify(item.name);

					return {
						...item,
						slug,
						slugPath: [...item.path.replaceAll("\\", "/").split("/").slice(0, -1), slug]
							.join("/")
							.replaceAll("\\", "/")
							.replace(new RegExp("^" + docsRoot + "/"), "")
					};
				}) satisfies ExtendedSidebarItem[]
			};
		}) satisfies RootSidebarItem<ExtendedSidebarItem>[];
	}
}
