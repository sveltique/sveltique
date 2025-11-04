<script lang="ts">
import {
	arrow as addArrow,
	autoUpdate,
	computePosition,
	offset,
	type Padding,
	type Placement,
	shift
} from "@floating-ui/dom";
import type { Snippet } from "svelte";
import { Paper, type PaperProps } from "$lib/components/paper/index.js";
import { Portal } from "$lib/components/portal/index.js";
import { getLocalContext } from "../context.svelte.js";
import { type PopoverContentVariants, popoverContent } from "../variants.js";

export interface PopoverContentProps extends PaperProps, PopoverContentVariants {
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
	/**
	 * The surface style of the paper.
	 * @default "elevated"
	 */
	variant?: PaperProps["variant"];
}

let {
	children,
	class: className,
	clippingPadding = 8,
	placement = "bottom",
	placementOffset = 8,
	ref = $bindable(),
	variant = "elevated",
	...restProps
}: PopoverContentProps = $props();

const context = getLocalContext();

$effect(() => {
	if (!ref) return;

	context.contentRef = ref;
});

$effect(() => {
	if (!context.triggerRef || !ref || !context.open) return;

	return autoUpdate(context.triggerRef, ref, updateTooltipPosition);
});

async function updateTooltipPosition() {
	if (!context.triggerRef || !ref) return;

	const { x, y, middlewareData } = await computePosition(context.triggerRef, ref, {
		placement,
		middleware: [
			offset(placementOffset),
			shift({ padding: clippingPadding }),
			context.arrowRef &&
				addArrow({ element: context.arrowRef, padding: context.arrowPadding })
		]
	});

	Object.assign(ref.style, {
		left: `${x}px`,
		top: `${y}px`
	});

	if (context.arrowRef && middlewareData.arrow) {
		const { x, y } = middlewareData.arrow;

		const staticSide = {
			top: "bottom",
			right: "left",
			bottom: "top",
			left: "right"
		}[placement.split("-").at(0)!]!;

		Object.assign(context.arrowRef.style, {
			left: x != null ? `${x}px` : "",
			top: y != null ? `${y}px` : "",
			right: "",
			bottom: "",
			[staticSide]: `-${context.arrowRef.offsetHeight / 2}px`
		});
	}
}
</script>

{#if context.open}
    <Portal target="body">
        <Paper
            bind:ref
            id="{context.id}-content"
            role="dialog"
            tabindex={-1}
            aria-modal="true"
            data-popover-content
            class={popoverContent({ className })}
            {variant}
            {...restProps}
        >
            {@render children?.()}
        </Paper>
    </Portal>
{/if}
