// Copied from Svelte to stay at 5.25.0

import { DEV } from "esm-env";
import { getContext, hasContext, setContext } from "svelte";

/**
 * Returns a `[get, set]` pair of functions for working with context in a type-safe way.
 *
 * `get` will throw an error if no parent component called `set`.
 */
export function createContext<T>(): [() => T, (context: T) => T] {
	const key = {};

	return [
		() => {
			if (!hasContext(key)) {
				if (DEV) {
					const error = new Error(
						`missing_context\nContext was not set in a parent component\nhttps://svelte.dev/e/missing_context`
					);

					error.name = "Svelte error";

					throw error;
				} else {
					throw new Error(`https://svelte.dev/e/missing_context`);
				}
			}

			return getContext(key);
		},
		(context) => setContext(key, context)
	];
}
