<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type LinkVariants, link } from "./variants.js";

type IconSnippet = Snippet<
	[
		{
			props: {
				"aria-hidden": true;
				/** CSS to manage the size of the icon. */
				class: string;
			};
		}
	]
>;

interface Props
	extends ReplaceWithTWMergeClass<HTMLAnchorAttributes>,
		WithRef<HTMLElement | HTMLAnchorElement>,
		LinkVariants {
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
	icon = fallbackIcon,
	ref = $bindable(),
	rel,
	target,
	underline = "always",
	...restProps
}: Props = $props();

let _target = $derived(target ?? (external ? "_blank" : undefined));
let _rel = $derived(rel ?? (external ? "noreferrer" : undefined));
let { container, icon: iconCss } = $derived(link({ underline }));
</script>

<!--
@component
A styled and accessible replacement for the native `a` element.
@see https://sveltique.dev/docs/components/browse/link
-->

<a bind:this={ref} {href} target={_target} rel={_rel} data-link class={container({ className })} {...restProps}>
    <!-- Avoid adding an unnecessary space at the end of a text link -->
	{@render children?.()}{#if external && icon !== false}
        {@render icon({ props: { class: iconCss(), "aria-hidden": true } })}
    {/if}
</a>

{#snippet fallbackIcon({ props }: Parameters<IconSnippet>["0"])}
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
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17 7l-10 10" />
        <path d="M8 7l9 0l0 9" />
    </svg>
{/snippet}
