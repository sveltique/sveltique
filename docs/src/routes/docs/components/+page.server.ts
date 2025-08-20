import { sidebarConfig } from '$lib/configs/sidebar.server.js';
import { redirect } from '@sveltejs/kit';

export async function load() {
	redirect(303, `/docs/components/${sidebarConfig.getFirstItem().slugPath}`);
}
