import Item from "./components/Item.svelte";
import Root from "./components/Root.svelte";

export type { RadioGroupProps as RadioProps } from "./components/Root.svelte";
export { type RadioGroupItemVariants, type RadioGroupVariants, radioGroup } from "./variants.js";

/**
 * A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the
 * buttons can be checked at a time.
 * @see https://sveltique.dev/docs/components/browse/radio-group
 */
export const RadioGroup = {
    Root,
    Item,
};
