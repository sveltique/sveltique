import Option, { type SelectOptionProps } from "./Option.svelte";
import Root, { type SelectProps } from "./Select.svelte";

export {
	type SelectOptionVariants,
	type SelectVariants,
	select,
	selectOption
} from "./variants.js";

export type { SelectProps, SelectOptionProps };

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
