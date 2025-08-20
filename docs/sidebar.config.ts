import { fromFileSystem } from '$lib/static-generator/sidebar.server';
import type { RootSidebarItem } from '$lib/static-generator/types';

export const prefix: string = 'content/components';

export const sidebar: RootSidebarItem[] = [
	{
		name: 'Getting Started',
		children: fromFileSystem('getting-started', prefix)
	},
	{
		name: 'Components',
		children: [
			{
				name: 'All Components',
				path: prefix + '/AllComponents.svelte'
			},
			...fromFileSystem('browse', prefix)
		]
	}
];
