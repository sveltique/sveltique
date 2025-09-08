export interface SidebarCategory {
	category: string;
	slugCategory: string;
	items: SidebarItem[];
}

export interface SidebarItem {
	name: string;
	path: string;
	slugName: string;
	metadata: {
		previous: (SidebarItem & { slugCategory: string }) | null;
		next: (SidebarItem & { slugCategory: string }) | null;
	};
}
