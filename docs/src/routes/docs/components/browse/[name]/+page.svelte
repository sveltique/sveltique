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
			@apply w-full text-3xl font-bold;
		}

		& > h2 {
			@apply mb-4 mt-12 scroll-mt-[calc(4rem-2px)] border-t border-zinc-300 pt-6 text-2xl font-bold;
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
			@apply bg-blue-700 underline;
		}
	}
</style>
