<script lang="ts">
	import { page } from '$app/state';
	import { getOnThisPageContext } from '$lib/contexts/on-this-page.svelte.js';

	let { data } = $props();

	const headings = getOnThisPageContext();

	$effect(() => {
		page.url.pathname && headings.getFromDOM();
	});
</script>

<svelte:head>
	<title>{data.name} | Components</title>
</svelte:head>

<div id="content" class="relative w-full py-6">
	<data.Component />
</div>

<style lang="postcss">
	@reference '../../../../../app.css';

	#content :global {
		& > h1 {
			@apply pb-4 text-2xl font-bold;
		}

		& > h2 {
			@apply scroll-mt-20 py-4 text-xl font-bold;
		}

		& > h3 {
			@apply scroll-mt-20 py-4 text-lg font-bold;
		}

		& > p {
			@apply pb-4;
		}

		& > ul {
			@apply pb-4;
		}

		& > a {
			@apply text-primary underline;
		}
	}
</style>
