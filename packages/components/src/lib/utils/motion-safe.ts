import { prefersReducedMotion } from "svelte/motion";

/** Returns a motion-safe value based on user preference. */
export function motionSafe<T, U>(reduced: T, noPreference: U): T | U {
    return prefersReducedMotion.current ? reduced : noPreference;
}
