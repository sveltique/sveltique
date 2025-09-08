import { loadSidebar } from "$lib/content/index.server";
import type { SidebarCategory } from "$lib/content/types";

export async function load({ params }) {
	return {
		sidebar: await loadSidebar(`./content/${params.sidebar}`, ["getting-started", "browse"])
	};
}
