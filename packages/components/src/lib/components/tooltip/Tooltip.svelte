<script lang="ts">
import type { Snippet } from "svelte";
import { on } from "svelte/events";
import { fade } from "svelte/transition";
import type { ClassNameValue } from "tailwind-merge";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { type TooltipVariants, tooltip } from "./variants.js";

type Ref = { current: HTMLElement | undefined };

export interface TooltipProps
	extends TWMergeClass,
		WithRef<HTMLElement | HTMLDivElement>,
		TooltipVariants {
	children?: Snippet<[{ ref: Ref; props: { "aria-describedby": string } }]>;
	containerClass?: ClassNameValue;
	id?: string;
	title: string;
	/** @default 1000 */
	z?: number;
}

let {
	children,
	class: className,
	containerClass,
	id,
	placement = "bottom",
	ref = $bindable(),
	title,
	z = 1000
}: TooltipProps = $props();

const uid = $props.id();

let childrenRef = $state<Ref>({ current: undefined });
let show = $state(false);

let _id = $derived(id ?? uid);
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

<div bind:this={ref} class={container({ className: containerClass })}>
	{@render children?.({ ref: childrenRef, props: { 'aria-describedby': _id } })}
    
	{#if show}
		<div
			transition:fade={{ duration: 150 }}
			id={_id}
			role="tooltip"
			tabindex="-1"
            data-tooltip
			style="z-index: {z};"
			class={tip({ className })}
		>
			{title}
		</div>
	{/if}
</div>
