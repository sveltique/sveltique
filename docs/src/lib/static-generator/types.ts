export interface RootSidebarItem {
	name: string;
	children: SidebarItem[];
}

export interface SidebarItem {
	name: string;
	/** The slug version of the name, will be slugified if not provided. */
	slug?: string;
	path: string;
	children?: SidebarItem[];
}

export interface ExtendedSidebarItem extends SidebarItem {
	slug: string;
	slugPath: string;
}
