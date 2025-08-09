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

<div id="content" class="relative w-full">
	<data.Component />
</div>

<style lang="postcss">
	@reference '../../../../../app.css';

	#content :global {
		& > h1 {
			@apply w-full text-3xl font-bold;
		}

		& > h2 {
			@apply mt-12 mb-4 scroll-mt-20 border-t border-zinc-300 pt-6 text-2xl font-bold;
		}

		& > h3 {
			@apply mt-8 scroll-mt-20 text-xl font-bold;
		}

		& > p {
			@apply my-4;
		}

		& > ul {
			@apply my-4;
		}

		& > a {
			@apply text-primary underline;
		}
	}
</style>
