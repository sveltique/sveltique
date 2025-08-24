import { redirect } from "@sveltejs/kit";
import { sidebarConfig } from "$lib/configs/sidebar.server.js";

export async function load() {
	redirect(303, `/docs/components/${sidebarConfig.getFirstItem().slugPath}`);
}
