<script lang="ts">
	import Separator from '$lib/components/data-display/separator/Separator.svelte';
	import Paper from '$lib/components/surfaces/paper/Paper.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		controls?: Snippet;
	}

	let { children, controls }: Props = $props();
</script>

<Paper variant="outline" elevation={0} class="mb-4 flex w-full items-stretch justify-between">
	<div class="relative flex grow items-center justify-center p-6">
		{@render children?.()}
	</div>
	{#if controls}
		<Separator orientation="vertical" />
		<div class="relative p-6">
			{@render controls()}
		</div>
	{/if}
</Paper>
