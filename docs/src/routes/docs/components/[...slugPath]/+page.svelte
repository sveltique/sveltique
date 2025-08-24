<script lang="ts">
import { onMount } from "svelte";
import { page } from "$app/state";
import { getOnThisPageContext } from "$lib/contexts/on-this-page.svelte.js";

let { data } = $props();

const headings = getOnThisPageContext();

const { default: Component, metadata } = $derived(await import(/* @vite-ignore */ data.path));

onMount(() => {
	headings.getFromDOM();
});

$effect(() => {
	page.url.pathname && headings.getFromDOM();
});
</script>

<svelte:head>
	<title>{data.name} - @sveltique/components</title>
	<meta name="description" content={metadata?.description} />
</svelte:head>

<div id="content" class="relative w-full pb-16">
	<Component />
</div>

<style lang="postcss">
	@reference '../../../../app.css';

	#content :global {
		& > h1 {
			@apply w-full text-3xl font-bold dark:text-zinc-100;
		}

		& > h2 {
			@apply mb-4 mt-12 scroll-mt-[calc(4rem-2px)] border-t border-zinc-300 pt-6 text-2xl font-bold dark:border-zinc-700 dark:text-zinc-100;
		}

		& > h3 {
			@apply mb-4 mt-8 scroll-mt-20 text-xl font-bold dark:text-zinc-100;
		}

		& > h4 {
			@apply mb-4 mt-8 scroll-mt-20 text-lg font-bold dark:text-zinc-100;
		}

		& > p {
			@apply my-4 dark:text-zinc-100;
		}

		& > ul {
			@apply my-4 flex list-disc flex-col gap-2 pl-10 dark:text-zinc-100;
		}

		& > a {
			@apply bg-blue-700 underline dark:bg-blue-300;
		}
	}
</style>
