<script lang="ts">
import {
	arrow as addArrow,
	autoUpdate,
	computePosition,
	flip,
	offset,
	type Padding,
	type Placement,
	shift
} from "@floating-ui/dom";
import { onDestroy, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { on } from "svelte/events";
import { flyAndScale } from "$lib/transitions/fly-and-scale.js";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { motionSafe } from "$utils/motion-safe.js";
import { onKeyDown } from "$utils/on-key.svelte.js";
import { Portal } from "../portal/index.js";
import { type TooltipVariants, tooltip } from "./variants.js";

type Ref = {
	/** @note Expects a subclass of `HTMLElement`. */
	// biome-ignore lint/suspicious/noExplicitAny: Not sure how to allow any subclass type of HTMLElement
	current: any | undefined;
};

type ChildrenSnippet = Snippet<[{ ref: Ref; props: { "aria-describedby": string | undefined } }]>;

export interface TooltipProps
	extends ReplaceWithTWMergeClass<Omit<HTMLAttributes<HTMLDivElement>, "children">>,
		WithRef<HTMLDivElement>,
		TooltipVariants {
	/**
	 * Whether to show an arrow pointing to the children or not.
	 * @default true
	 */
	arrow?: boolean;
	/**
	 * The padding between the arrow element and the `children`'s edges.
	 * @default 0
	 */
	arrowPadding?: Padding;
	/**
	 * The children content on which to add the tooltip.
	 * @default —
	 */
	children?: ChildrenSnippet;
	/**
	 * The distance in pixels from the tooltip’s edges to the viewport, used for collision detection.
	 * @default 8
	 */
	clippingPadding?: Padding;
	/**
	 * The delay before showing the tooltip.
	 * @default 250
	 */
	delay?: number;
	/**
	 * The ID of the tooltip.
	 * @default $props.id()
	 */
	id?: string;
	/**
	 * The placement of the tooltip.
	 * @default "top"
	 */
	placement?: Placement;
	/**
	 * The distance in pixels from the `children`.
	 * @default 8
	 */
	placementOffset?: number;
	/** The content of the tooltip. */
	title: string;
}

let {
	arrow = true,
	arrowPadding = 0,
	children,
	class: className,
	clippingPadding = 8,
	delay = 250,
	id,
	placement = "top",
	placementOffset = 8,
	ref = $bindable(),
	title,
	...restProps
}: TooltipProps = $props();

let showTimeout: NodeJS.Timeout;

const uid = $props.id();

let arrowRef = $state<HTMLDivElement>();
let childrenRef = $state<Ref>({ current: undefined });

let show = $state(false);
let isArrowReady = $derived(!arrow || !!arrowRef);

let _id = $derived(id ?? uid);
let { arrow: arrowCss, container } = $derived(tooltip());

$effect(() => {
	if (!childrenRef.current) return;

	const cleanups = [
		on(childrenRef.current!, "mouseenter", () => showTooltip(false)),
		on(childrenRef.current!, "focus", () => showTooltip(true)),
		...["mouseleave", "blur", "click"].map((type) =>
			on(childrenRef.current!, type, closeTooltip)
		)
	];

	return () => cleanups.forEach((cleanup) => cleanup());
});

onKeyDown("Escape", closeTooltip);

$effect(() => {
	if (!childrenRef.current || !ref || !isArrowReady || !show) return;

	return autoUpdate(childrenRef.current, ref, updateTooltipPosition);
});

onDestroy(() => {
	showTimeout && clearTimeout(showTimeout);
});

async function updateTooltipPosition() {
	if (!childrenRef.current || !ref || !isArrowReady) return;

	const {
		x,
		y,
		middlewareData,
		placement: finalPlacement
	} = await computePosition(childrenRef.current, ref, {
		placement,
		middleware: [
			offset(placementOffset),
			flip(),
			shift({ padding: clippingPadding }),
			arrow && arrowRef && addArrow({ element: arrowRef, padding: arrowPadding })
		]
	});

	Object.assign(ref.style, {
		left: `${x}px`,
		top: `${y}px`
	});

	if (arrow && arrowRef && middlewareData.arrow) {
		const { x, y } = middlewareData.arrow;

		const staticSide = {
			top: "bottom",
			right: "left",
			bottom: "top",
			left: "right"
		}[finalPlacement.split("-").at(0)!]!;

		Object.assign(arrowRef.style, {
			left: x != null ? `${x}px` : "",
			top: y != null ? `${y}px` : "",
			right: "",
			bottom: "",
			[staticSide]: `-${arrowRef.offsetHeight}px`
		});
	}
}

function showTooltip(skipDelay: boolean = false) {
	if (skipDelay) {
		show = true;
		return;
	}

	showTimeout = setTimeout(() => {
		show = true;
	}, delay);
}

function closeTooltip() {
	if (showTimeout) {
		clearTimeout(showTimeout);
	}

	show = false;
}
</script>

<!--
@component
Display informative text when users hover or focus an element.
@see https://sveltique.dev/docs/components/browse/tooltip
-->

{@render children?.({ ref: childrenRef, props: { 'aria-describedby': show ? _id : undefined } })}

{#if show}
    <Portal target="body">
        <div
            bind:this={ref}
            transition:flyAndScale={{ y: 0, duration: motionSafe(0, 150) }}
            id={_id}
            role="tooltip"
            data-tooltip
            class={container({ className })}
            {...restProps}
        >
            {title}

            {#if arrow}
                <div bind:this={arrowRef} data-tooltip-arrow class={arrowCss()}></div>
            {/if}
        </div>
    </Portal>
{/if}
