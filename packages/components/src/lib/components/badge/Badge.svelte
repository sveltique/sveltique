<script lang="ts">
import type { Snippet } from "svelte";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { type BadgeVariants, badge } from "./variants.js";

interface Props extends BadgeVariants, TWMergeClass, WithRef<HTMLElement | HTMLDivElement> {
	children?: Snippet;
}

let {
	children,
	class: className = undefined,
	variant = "contained",
	number = false,
	ref = $bindable()
}: Props = $props();
</script>

<!--
@component
A small badge with rounded corners.
@see https://sveltique.dev/docs/components/browse/badge
-->

<div bind:this={ref} data-badge class={badge({ variant, number, className })}>
	{@render children?.()}
</div>
