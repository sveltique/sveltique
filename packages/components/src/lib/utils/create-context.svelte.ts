// PORTED FROM SVELTE TO STAY AT VERSION 5.25.0

import { getContext, hasContext, setContext } from "svelte";

/**
 * Returns a `[get, set]` pair of functions for working with context in a type-safe way.
 *
 * `get` will throw an error if no parent component called `set`.
 * @internal PORTED FROM SVELTE TO STAY AT VERSION 5.25.0
 */
export function createContext<T>(): [() => T, (context: T) => T] {
    const key = {};

    return [
        () => {
            if (!hasContext(key)) {
                throw new Error("getContext called before setContext");
            }

            return getContext<T>(key);
        },
        (context: T) => setContext<T>(key, context),
    ];
}
