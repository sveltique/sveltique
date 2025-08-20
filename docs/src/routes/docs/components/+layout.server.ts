import { sidebarConfig } from '$lib/configs/sidebar.server';

export async function load() {
	return {
		prefix: sidebarConfig.prefix,
		sidebar: sidebarConfig.sidebar
	};
}
