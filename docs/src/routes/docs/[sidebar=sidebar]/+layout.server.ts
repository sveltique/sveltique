import { loadSidebar } from "$lib/content/index.server";

export async function load({ params }) {
	return {
		sidebar: await loadSidebar(`./content/${params.sidebar}`, ["getting-started", "browse"])
	};
}
