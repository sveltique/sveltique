<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		loading: Snippet;
	}

	let { children, loading }: Props = $props();
</script>

<svelte:boundary>
	{@render children()}

	{#snippet pending()}
		{@render loading()}
	{/snippet}
</svelte:boundary>
