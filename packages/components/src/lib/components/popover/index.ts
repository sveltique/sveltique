import Arrow from "./components/Arrow.svelte";
import Close from "./components/Close.svelte";
import Content from "./components/Content.svelte";
import Root from "./components/Root.svelte";
import Trigger from "./components/Trigger.svelte";

export type { PopoverArrowProps } from "./components/Arrow.svelte";
export type { PopoverCloseProps } from "./components/Close.svelte";
export type { PopoverContentProps } from "./components/Content.svelte";
export type { PopoverProps } from "./components/Root.svelte";
export type { PopoverTriggerProps } from "./components/Trigger.svelte";
export { type PopoverContentVariants, popoverContent } from "./variants.js";

/**
 * Displays content on top of another.
 * @see https://sveltique.dev/docs/components/browse/popover
 */
export const Popover = {
    Root,
    Trigger,
    Content,
    Arrow,
    Close,
};
