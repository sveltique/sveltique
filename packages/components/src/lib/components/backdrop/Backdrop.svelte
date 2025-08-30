<script lang="ts">
import type { Snippet } from "svelte";
import { fade } from "svelte/transition";
import type { TWMergeClass } from "$lib/types.js";
import { backdrop } from "./variants.js";

export interface BackdropProps extends TWMergeClass {
	children?: Snippet;
	/** @default 150 */
	fadeDuration?: number;
	/** @default 10 */
	z?: number;
	onClick?: () => void;
}

let { children, class: className, fadeDuration = 150, z = 10, onClick }: BackdropProps = $props();

let ref = $state<HTMLDivElement>();

function onclick(event: MouseEvent) {
	if (event.target !== ref) return;

	onClick?.();
}
</script>

<div
	bind:this={ref}
	transition:fade={{ duration: fadeDuration }}
	{onclick}
    data-backdrop
	aria-hidden={true}
	style="z-index: {z}"
	class={backdrop({ className })}
>
	{@render children?.()}
</div>
