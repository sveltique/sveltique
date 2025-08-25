import path from "node:path";
import { error } from "@sveltejs/kit";
import { sidebarConfig } from "$lib/configs/sidebar.server";

export function load({ params, parent }) {
	const item = sidebarConfig.findBySlugPath(params.slugPath);
	if (!item) error(404, "Not found");

	return {
		name: item.name,
		path: path.join("../../../../..", item.path).replaceAll("\\", "/")
	};
}

export function entries() {
	return sidebarConfig.flatChildren.map(({ slugPath }) => ({ slugPath }));
}
