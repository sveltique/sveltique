import Root from "./Accordion.svelte";
import Item from "./AccordionItem.svelte";

export { type AccordionItemVariants, accordion, accordionItem } from "./variants.js";

/**
 * Lets users show and hide sections of related content on a page.
 * @see https://sveltique.dev/docs/components/browse/accordion
 */
export const Accordion = {
	/** The root component of an accordion. */
	Root,
	/** An individual item inside an accordion. */
	Item
};
