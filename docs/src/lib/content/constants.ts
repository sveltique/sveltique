export const SIDEBAR_NAMES = ["components"] as const;

export type SidebarName = (typeof SIDEBAR_NAMES)[number];
