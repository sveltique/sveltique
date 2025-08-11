<script lang="ts">
	import { fade } from 'svelte/transition';
	import { backdrop } from './variants.js';

	interface Props {
		/** @default 150 */
		fadeDuration?: number;
		/** @default 10 */
		z?: number;
		onClick?: () => void;
	}

	let { fadeDuration = 150, z = 10, onClick }: Props = $props();
</script>

<div
	transition:fade={{ duration: fadeDuration }}
	onclick={onClick}
	aria-hidden={true}
	style="z-index: {z}"
	class={backdrop()}
></div>
