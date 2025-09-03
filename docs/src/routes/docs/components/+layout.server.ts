import { sidebarConfig } from "$lib/configs/sidebar.server";

export async function load() {
	return {
		sidebar: sidebarConfig.sidebar
	};
}
