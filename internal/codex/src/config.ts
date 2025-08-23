import fs from 'node:fs';
import path from 'node:path';
import type { SidebarConfigData, SidebarItem } from './types';

/** A helper to define a sidebar config. */
export function defineConfig(
	fn: SidebarConfigData<SidebarItem> | (() => SidebarConfigData<SidebarItem>)
) {
	return typeof fn === 'function' ? fn() : fn;
}

/**
 * Recursively generate sidebar items from a directory.
 * @note It only supports top-level files.
 */
export function fromFileSystem(dirPath: string, docsRoot: string = ''): SidebarItem[] {
	const items: SidebarItem[] = [];
	const entries = fs.readdirSync(path.join(docsRoot, dirPath), { withFileTypes: true });

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
