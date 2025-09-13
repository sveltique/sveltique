<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { type PaperVariants, paper } from "./variants.js";

export interface PaperProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "class">,
		TWMergeClass,
		PaperVariants,
		WithRef<HTMLDivElement> {}

let {
	children,
	class: className = undefined,
	ref = $bindable(),
	...restProps
}: PaperProps = $props();
</script>

<!--
@component
A surface to organize related content and, when needed, display actions in a consistent way.
@see https://sveltique.dev/docs/components/browse/paper
-->

<div bind:this={ref} data-paper class={paper({ className })} {...restProps}>
	{@render children?.()}
</div>
