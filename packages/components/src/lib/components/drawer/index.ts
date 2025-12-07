import Root from "./components/Root.svelte";
import Trigger from "./components/Trigger.svelte";

export { type DrawerProps } from "./components/Root.svelte";
export { type DrawerVariants, drawer } from "./variants.js";

export const Drawer = {
	Root,
	Trigger
};
