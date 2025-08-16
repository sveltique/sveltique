<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.name} | Components</title>
</svelte:head>

<div id="content" class="relative w-full pb-16">
	<data.Component />
</div>

<style lang="postcss">
	@reference '../../../../../app.css';

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

		& > p {
			@apply my-4 dark:text-zinc-100;
		}

		& > ul {
			@apply my-4 dark:text-zinc-100;
		}

		& > a {
			@apply bg-blue-700 underline dark:bg-blue-300;
		}
	}
</style>
