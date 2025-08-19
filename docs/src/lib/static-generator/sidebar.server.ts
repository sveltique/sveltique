import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { RootSidebarItem, SidebarItem } from './types';
import { slugify } from '$utils/string';

/** Recursively generate docs structure. */
export function fromFileSystem(dirPath: string, prefix: string = ''): SidebarItem[] {
	const items: SidebarItem[] = [];
	const entries = fs.readdirSync(path.join(prefix, dirPath), { withFileTypes: true });

	for (const entry of entries) {
		// TODO : Support one day
		if (entry.isDirectory()) continue;

		items.push({
			name: entry.name.split('.').at(0)!,
			path: path.join(entry.parentPath, `./${entry.name}`),
			children: undefined
		});
	}

	return items;
}

/** Dynamically import a TS/JS config file relative to root and return its default export. */
export async function loadSidebarConfig(filePath: string = 'sidebar.config.ts') {
	const absolutePath = path.resolve('./', filePath);
	const { prefix, sidebar }: { prefix: string; sidebar: RootSidebarItem[] } = await import(
		/* @vite-ignore */ pathToFileURL(absolutePath).href
	);

	return {
		prefix,
		sidebar: sidebar.map((root) => {
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
				}) satisfies SidebarItem[]
			};
		}) satisfies RootSidebarItem[]
	};
}
