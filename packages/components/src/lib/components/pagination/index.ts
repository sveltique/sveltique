import Ellipsis from "./components/Ellipsis.svelte";
import Item from "./components/Item.svelte";
import Next from "./components/Next.svelte";
import Previous from "./components/Previous.svelte";
import Root from "./components/Root.svelte";

/**
 * Enables navigation through a range of pages, with support for previous/next links and skipped pages.
 * @see http://sveltique.dev/docs/components/browse/pagination
 */
export const Pagination = {
	/**
	 * The container for pagination items.
	 * @see http://sveltique.dev/docs/components/browse/pagination
	 */
	Root,
	/**
	 * A clickable page link.
	 * @see http://sveltique.dev/docs/components/browse/pagination
	 */
	Item,
	/**
	 * A shorthand for `Pagination.Item` with a "previous" icon (<).
	 * @see http://sveltique.dev/docs/components/browse/pagination
	 */
	Previous,
	/**
	 * A shorthand for `Pagination.Item` with a "next" icon (>).
	 * @see http://sveltique.dev/docs/components/browse/pagination
	 */
	Next,
	/**
	 * An inert placeholder showing skipped pages (...).
	 * @see http://sveltique.dev/docs/components/browse/pagination
	 */
	Ellipsis
};

export { type PaginationItemProps } from "./types.js";
