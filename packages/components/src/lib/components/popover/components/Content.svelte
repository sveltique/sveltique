<script lang="ts">
import {
	autoUpdate,
	computePosition,
	flip,
	offset,
	type Padding,
	type Placement,
	shift
} from "@floating-ui/dom";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { flyAndScale } from "$lib/transitions/fly-and-scale.js";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { getLocalContext } from "../context.svelte.js";
import { type PopoverContentVariants, popoverContent } from "../variants.js";
import { Portal } from "$lib/components/portal/index.js";

export interface PopoverContentProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		PopoverContentVariants {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/**
	 * The distance in pixels from the tooltip’s edges to the viewport, used for collision detection.
	 * @default 8
	 */
	clippingPadding?: Padding;
	/**
	 * The placement of the tooltip.
	 * @default "bottom"
	 */
	placement?: Placement;
	/**
	 * The distance in pixels from the `children`.
	 * @default 8
	 */
	placementOffset?: number;
}

let {
	children,
	class: className,
	clippingPadding = 8,
	placement = "bottom",
	placementOffset = 8,
	ref = $bindable(),
	...restProps
}: PopoverContentProps = $props();

const context = getLocalContext();

$effect(() => {
	if (!context.triggerRef || !ref || !context.open) return;

	return autoUpdate(context.triggerRef, ref, updateTooltipPosition);
});

async function updateTooltipPosition() {
	if (!context.triggerRef || !ref) return;

	const { x, y } = await computePosition(context.triggerRef, ref, {
		placement,
		middleware: [offset(placementOffset), flip(), shift({ padding: clippingPadding })]
	});

	Object.assign(ref.style, {
		left: `${x}px`,
		top: `${y}px`
	});
}
</script>

<!--
@component
TODO : Explain what Popover does
@see https://sveltique.dev/docs/components/browse/popover.svelte
-->

{#if context.open}
    <Portal target="body">
        <div
            bind:this={ref}
            transition:flyAndScale={{ y: 0 }}
            data-popover-content
            class={popoverContent({ className })}
            {...restProps}
        >
            {@render children?.()}
        </div>
    </Portal>
{/if}
