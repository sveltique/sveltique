import { SIDEBAR_NAMES, type SidebarName } from "$lib/content/constants";

export function match(sidebar: string): sidebar is SidebarName {
	return SIDEBAR_NAMES.includes(sidebar as SidebarName);
}
