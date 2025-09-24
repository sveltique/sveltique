<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type BadgeVariants, badge } from "./variants.js";

export interface BadgeProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		BadgeVariants,
		WithRef<HTMLDivElement> {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/**
	 * Whether to fully round the badge or not.
	 * @default false
	 */
	number?: BadgeVariants["number"];
	/**
	 * The variant of the badge to render.
	 * @default "contained"
	 */
	variant?: BadgeVariants["variant"];
}

let {
	children,
	class: className = undefined,
	number = false,
	ref = $bindable(),
	variant = "contained",
	...restProps
}: BadgeProps = $props();
</script>

<!--
@component
A small badge with rounded corners.
@see https://sveltique.dev/docs/components/browse/badge
-->

<div
    bind:this={ref}
    data-badge
    class={badge({ variant, number, className })}
    {...restProps}
>
	{@render children?.()}
</div>
