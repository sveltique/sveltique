<script lang="ts">
	import Skeleton from './Skeleton.svelte';
	import Playground from '$docs/Playground.svelte';
	import Button from '$lib/components/inputs/button/Button.svelte';
	import { code } from './content.js';

	let loading = $state(true);

	$effect(() => {
		if (loading) {
			main();
		}

		async function main() {
			await sleep(3000);
			loading = false;
		}
	});

	async function sleep(ms: number) {
		return new Promise<void>((resolve) => {
			setTimeout(resolve, ms);
		});
	}
</script>

<h1>Skeleton</h1>
<p>A placeholder component to display while the content is loading.</p>
<Playground {code} class="flex-col">
	<div class="relative aspect-square w-40 overflow-hidden rounded-2xl">
		{#if loading}
			<Skeleton class="h-full w-full" />
		{:else}
			<img
				src="/images/lost-in-japan.jpg"
				alt="Lost In Japan cover"
				class="h-full w-full object-cover"
			/>
		{/if}
	</div>
	<Button onclick={() => (loading = true)} disabled={loading}>Restart</Button>
</Playground>
