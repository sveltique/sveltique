import { getContext, setContext } from "svelte";

export type Animation = "system" | "always" | "never";

export interface ProviderContextOptions {
	/**
	 * The animation strategy for the entire application.
	 * @default "system"
	 */
	animation?: Animation;
}

export interface OverrideProviderContextOptions {
	/**
	 * Overrides the global animation strategy.
	 * @default getProviderContext().animation
	 */
	animation?: Animation | undefined;
}

const PROVIDER_CONTEXT_KEY = Symbol("ProviderContext");

/** Gets the provider context. */
export function getProviderContext(): ProviderContext {
	return getContext<ProviderContext>(PROVIDER_CONTEXT_KEY);
}

/**
 * Sets the provider context with the given options.
 * @internal
 */
export function setProviderContext(options: () => ProviderContextOptions): ProviderContext {
	return setContext(PROVIDER_CONTEXT_KEY, new ProviderContext(options));
}

class ProviderContext {
	public animation: Animation;

	constructor(options: () => ProviderContextOptions) {
		this.animation = $derived(options().animation ?? "system");
	}
}
