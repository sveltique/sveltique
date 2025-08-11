<script lang="ts">
	import { fade } from 'svelte/transition';
	import { backdrop } from './variants.js';
	import type { Snippet } from 'svelte';
	import type { WithTWMergeClass } from '$lib/types.js';
	import { on } from 'svelte/events';

	export interface BackdropProps extends WithTWMergeClass {
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
	aria-hidden={true}
	style="z-index: {z}"
	class={backdrop({ className })}
>
	{@render children?.()}
</div>
