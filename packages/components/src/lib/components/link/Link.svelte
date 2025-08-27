<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass } from "$lib/types.js";
import { type LinkVariants, link } from "./variants.js";

type IconSnippet = Snippet<
	[
		{
			/** CSS to manage the size of the icon. */
			css: string;
		}
	]
>;

interface Props extends ReplaceWithTWMergeClass<HTMLAnchorAttributes>, LinkVariants {
	/**
	 * Shorthand for setting `target="_blank"` and `rel="noreferrer"`.
	 * @note Passing target and/or rel overrides the values set by `external`.
	 * @default false
	 */
	external?: boolean;
	/** @default "always" */
	underline?: "always" | "hover" | "none";
	/**
	 * The icon to use for external links.
	 *
	 * Set to `false` to not show the icon.
	 */
	icon?: IconSnippet | false;
}

let {
	children,
	class: className,
	external = false,
	href,
	rel,
	target,
	underline = "always",
	icon = fallbackIcon,
	...restProps
}: Props = $props();

let _target = $derived(target ?? (external ? "_blank" : undefined));
let _rel = $derived(rel ?? (external ? "noreferrer" : undefined));
let { container, icon: iconCss } = $derived(link({ underline }));
</script>

<a {href} target={_target} rel={_rel} class={container({ className })} {...restProps}>
	{@render children?.()}

    {#if external && icon !== false}
        {@render icon({ css: iconCss() })}
    {/if}
</a>

{#snippet fallbackIcon({ css }: { css: string })}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right {css}"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17 7l-10 10" />
        <path d="M8 7l9 0l0 9" />
    </svg>
{/snippet}
