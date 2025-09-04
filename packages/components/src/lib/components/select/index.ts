import Option from "./Option.svelte";
import Root from "./Select.svelte";

export {
	type SelectOptionVariants,
	type SelectVariants,
	select,
	selectOption
} from "./variants.js";

/**
 * A styled, accessible dropdown replacement for the native `select` element, ensuring consistent appearance and behavior across browsers.
 * @see https://sveltique.dev/docs/components/browse/select
 */
export const Select = {
	/** The root element of a select element. */
	Root,
	/** A single option in the select's dropdown. */
	Option
};
