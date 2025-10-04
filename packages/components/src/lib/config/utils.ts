import { prefersReducedMotion } from "svelte/motion";
import type { Animation } from "./context.svelte.js";

/**
 * Returns a value based on the given animation value.
 * @param animation The animation value to follow.
 * @param allowed The value if motion is allowed.
 * @param disallowed The value if motion is disallowed.
 */
export function resolveAnimation<T, U>(animation: Animation, allowed: T, disallowed: U): T | U {
	if (animation === "never") return disallowed;
	if (animation === "always") return allowed;

	return prefersReducedMotion.current ? disallowed : allowed;
}
