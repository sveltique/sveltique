<script lang="ts">
import type { Snippet } from "svelte";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type BadgeVariants, badge } from "./variants.js";
import type { HTMLAttributes } from "svelte/elements";

export interface BadgeProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		BadgeVariants,
		WithRef<HTMLDivElement> {
	children?: Snippet;
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
