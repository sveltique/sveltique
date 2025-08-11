<script lang="ts">
	import { fade } from 'svelte/transition';
	import { backdrop } from './variants.js';
	import type { Snippet } from 'svelte';
	import type { WithTWMergeClass } from '$lib/types.js';

	interface Props extends WithTWMergeClass {
		children?: Snippet;
		/** @default 150 */
		fadeDuration?: number;
		/** @default 10 */
		z?: number;
		onClick?: () => void;
	}

	let { children, class: className, fadeDuration = 150, z = 10, onClick }: Props = $props();
</script>

<div
	transition:fade={{ duration: fadeDuration }}
	onclick={onClick}
	aria-hidden={true}
	style="z-index: {z}"
	class={backdrop({ className })}
>
	{@render children?.()}
</div>
