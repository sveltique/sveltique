import { loadSidebarConfig } from '$lib/static-generator/sidebar.server';

export async function load() {
	return await loadSidebarConfig();
}
