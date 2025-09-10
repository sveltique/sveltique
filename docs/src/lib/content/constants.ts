export const SIDEBAR_NAMES = ["components", "patterns"] as const;

export type SidebarName = (typeof SIDEBAR_NAMES)[number];
