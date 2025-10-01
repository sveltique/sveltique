import Root from "./Accordion.svelte";
import Item from "./AccordionItem.svelte";

export type { AccordionProps } from "./Accordion.svelte";
export type { AccordionItemProps } from "./AccordionItem.svelte";
export { type AccordionItemVariants, accordion, accordionItem } from "./variants.js";

/**
 * Lets users show and hide sections of related content on a page.
 * @see https://sveltique.dev/docs/components/browse/accordion
 */
export const Accordion = {
	/**
	 * The root component of an accordion.
	 * @see https://sveltique.dev/docs/components/browse/accordion
	 */
	Root,
	/**
	 * An individual item inside an accordion.
	 * @see https://sveltique.dev/docs/components/browse/accordion
	 */
	Item
};
