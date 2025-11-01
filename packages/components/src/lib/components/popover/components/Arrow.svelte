<script lang="ts">
import type { Padding } from "@floating-ui/dom";
import { onMount, untrack } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { getLocalContext } from "../context.svelte.js";
import { type PopoverArrowVariants, popoverArrow } from "../variants.js";

export interface PopoverArrowProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		PopoverArrowVariants {
	/**
	 * The padding between the arrow element and the trigger's edges.
	 * @default 0
	 */
	padding?: Padding;
}

let { class: className, padding = 0, ref = $bindable() }: PopoverArrowProps = $props();

const context = getLocalContext();

onMount(() => {
	if (!ref) return;

	context.contentRef = ref;
});

$effect(() => {
	padding;

	untrack(() => {
		context.arrowPadding = padding;
	});
});
</script>

<div
    bind:this={ref}
    data-popover-arrow
    class={popoverArrow({ className })}
></div>
