import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { slugify } from './utils/string';
import type { ExtendedSidebarItem, RootSidebarItem, SidebarConfigData, SidebarItem } from './types';

export class SidebarConfig {
	#prefix: string;
	#originalSidebar: RootSidebarItem<SidebarItem>[];
	#sidebar: RootSidebarItem<ExtendedSidebarItem>[];

	constructor(prefix: string, sidebar: RootSidebarItem<SidebarItem>[]) {
		this.#prefix = prefix;
		this.#originalSidebar = sidebar;
		this.#sidebar = this.#createExtendedSidebar(this.#prefix, this.#originalSidebar);
	}

	get prefix() {
		return this.#prefix;
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
	public static async load(filePath: string = 'sidebar.config.ts') {
		const absolutePath = path.resolve('./', filePath);
		const { prefix = '', sidebar }: SidebarConfigData<SidebarItem> = (
			await import(/* @vite-ignore */ pathToFileURL(absolutePath).href)
		).default;

		return new SidebarConfig(prefix, sidebar);
	}

	public toJSON(): SidebarConfigData<SidebarItem> {
		return {
			prefix: this.#prefix,
			sidebar: this.#originalSidebar
		};
	}

	public static fromJSON(json: SidebarConfigData<SidebarItem>): SidebarConfig {
		return new SidebarConfig(json.prefix ?? '', json.sidebar);
	}

	#createExtendedSidebar(prefix: string, sidebar: RootSidebarItem<SidebarItem>[]) {
		const clone = structuredClone(sidebar);

		return clone.map((root) => {
			return {
				name: root.name,
				children: root.children.map((item) => {
					const slug = item.slug ?? slugify(item.name);

					return {
						...item,
						slug,
						slugPath: [...item.path.replaceAll('\\', '/').split('/').slice(0, -1), slug]
							.join('/')
							.replaceAll('\\', '/')
							.replace(new RegExp('^' + prefix + '/'), '')
					};
				}) satisfies ExtendedSidebarItem[]
			};
		}) satisfies RootSidebarItem<ExtendedSidebarItem>[];
	}
}
