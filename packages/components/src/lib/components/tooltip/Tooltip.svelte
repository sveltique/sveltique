<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { on } from "svelte/events";
import { fade } from "svelte/transition";
import type { ClassNameValue } from "tailwind-merge";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { motionSafe } from "$utils/motion-safe.js";
import { type TooltipVariants, tooltip } from "./variants.js";

type Ref = {
	/** @note Expects a subclass of `HTMLElement`. */
	// biome-ignore lint/suspicious/noExplicitAny: Not sure how to allow any subclass type of HTMLElement
	current: any | undefined;
};

export interface TooltipProps
	extends ReplaceWithTWMergeClass<Omit<HTMLAttributes<HTMLDivElement>, "children">>,
		WithRef<HTMLDivElement>,
		TooltipVariants {
	/**
	 * The children content on which to add the tooltip.
	 * @default —
	 */
	children?: Snippet<[{ ref: Ref; props: { "aria-describedby": string } }]>;
	/**
	 * Additional classes to add to the root container.
	 * @deprecated Use `containerProps` instead.
	 * @default —
	 */
	containerClass?: ClassNameValue;
	/**
	 * Additional properties to customize the root container.
	 * @default {}
	 */
	containerProps?: ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>;
	/**
	 * The ID of the tooltip.
	 * @default $props.id
	 */
	id?: string;
	/** The content of the tooltip. */
	title: string;
	/**
	 * The z-index of the tooltip. Shorthand for `style="z: XX"`.
	 * @default 1000
	 */
	z?: number;
	/**
	 * The placement of the tooltip.
	 * @default "bottom"
	 */
	placement?: TooltipVariants["placement"];
}

let {
	children,
	class: className,
	containerClass: __DEPRECATED_containerClass,
	containerProps = {},
	id,
	placement = "bottom",
	ref = $bindable(),
	title,
	z = 1000,
	...restProps
}: TooltipProps = $props();

const uid = $props.id();

let childrenRef = $state<Ref>({ current: undefined });
let show = $state(false);

let _id = $derived(id ?? uid);
let { class: containerClass, ...restContainerProps } = $derived(containerProps);
let { container, tip } = $derived(tooltip({ placement }));

$effect(() => {
	if (!childrenRef.current) return;

	const cleanups = [
		...["pointerenter", "focus"].map((type) =>
			on(childrenRef.current!, type, () => {
				show = true;
			})
		),
		...["pointerleave", "blur"].map((type) =>
			on(childrenRef.current!, type, () => {
				show = false;
			})
		)
	];

	return () => cleanups.forEach((cleanup) => cleanup());
});
</script>

<!--
@component
Display informative text when users hover over, focus on, or tap an element.
@see https://sveltique.dev/docs/components/browse/tooltip
-->

<div
    bind:this={ref}
    class={container({ className: [__DEPRECATED_containerClass, containerClass] })}
    {...restContainerProps}
>
	{@render children?.({ ref: childrenRef, props: { 'aria-describedby': _id } })}
    
	{#if show}
		<div
			transition:fade={{ duration: motionSafe(0, 150) }}
			id={_id}
			role="tooltip"
			tabindex="-1"
            data-tooltip
			style="z-index: {z};"
			class={tip({ className })}
            {...restProps}
		>
			{title}
		</div>
	{/if}
</div>
