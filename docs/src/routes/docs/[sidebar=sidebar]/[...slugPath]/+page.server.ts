import path from "node:path";
import { error } from "@sveltejs/kit";
import { SIDEBAR_NAMES } from "$lib/content/constants";
import { find, loadSidebar } from "$lib/content/index.server";

export async function load({ params, parent }) {
	const { sidebar } = await parent();

	const item = find(sidebar, params.slugPath);
	if (!item) error(404, "Not found");

	return {
		name: item.name,
		path: path.join("../../../../..", item.path).replaceAll("\\", "/"),
		...item.metadata
	};
}

export async function entries() {
	const futureSidebars = SIDEBAR_NAMES.map(async (sidebarName) => {
		const sidebar = await loadSidebar(sidebarName);

		return sidebar.flatMap((category) => {
			return category.items.map((item) => {
				return {
					sidebar: sidebarName,
					slugPath: `${category.slugCategory}/${item.slugName}`
				};
			});
		});
	});

	const sidebars = await Promise.all(futureSidebars);

	return sidebars.flat();
}
