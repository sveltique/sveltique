<script lang="ts">
import type { Snippet } from "svelte";
import { on } from "svelte/events";
import { fade } from "svelte/transition";
import type { TWMergeClass } from "$lib/types.js";
import { type TooltipVariants, tooltip } from "./variants.js";

type Ref = { current: HTMLElement | undefined };

interface Props extends TWMergeClass, TooltipVariants {
	children?: Snippet<[{ ref: Ref; props: { "aria-describedby": string } }]>;
	id?: string;
	title: string;
	/** @default 1000 */
	z?: number;
}

let { children, id, class: className, placement = "bottom", title, z = 1000 }: Props = $props();

const uid = $props.id();

let ref = $state<Ref>({ current: undefined });
let show = $state(false);

let _id = $derived(id ?? uid);
let { container, tip } = $derived(tooltip({ placement }));

$effect(() => {
	if (!ref.current) return;

	const cleanups = [
		...["pointerenter", "focus"].map((type) =>
			on(ref.current!, type, () => {
				show = true;
			})
		),
		...["pointerleave", "blur"].map((type) =>
			on(ref.current!, type, () => {
				show = false;
			})
		)
	];

	return () => cleanups.forEach((cleanup) => cleanup());
});
</script>

<div class={container()}>
	{@render children?.({ ref, props: { 'aria-describedby': _id } })}
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
