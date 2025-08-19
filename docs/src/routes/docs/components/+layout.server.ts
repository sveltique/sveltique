import { loadSidebarConfig } from '$lib/static-generator/sidebar.server';

export async function load() {
	const config = await loadSidebarConfig();

	return config;
}
