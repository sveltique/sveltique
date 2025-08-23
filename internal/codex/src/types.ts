export interface RootSidebarItem<T> {
	name: string;
	children: T[];
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

export interface SidebarConfigData<T> {
	/**
	 * The global prefix to search for docs.
	 *
	 * THIS IS REMOVED FROM THE PATH WHEN SERVING THE DOCS.
	 * @default ""
	 */
	docsRoot?: string;
	sidebar: RootSidebarItem<T>[];
}
