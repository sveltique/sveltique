import Content from "./components/Content.svelte";
import Root from "./components/Root.svelte";
import Trigger from "./components/Trigger.svelte";

export type { PopoverProps } from "./components/Root.svelte";
export { type PopoverContentVariants, type PopoverVariants, popover, popoverContent } from "./variants.js";

export const Popover = {
    Root,
    Trigger,
    Content,
};
