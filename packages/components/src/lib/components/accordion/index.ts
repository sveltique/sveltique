import Root from './Accordion.svelte';
import Item from './AccordionItem.svelte';

export { accordion, accordionItem, type AccordionItemVariants } from './variants.js';
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
