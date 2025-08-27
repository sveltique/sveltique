<script lang="ts">
let { data } = $props();
</script>

<svelte:head>
	<title>{data.name} - @sveltique/components</title>
	<meta name="description" content={data.metadata?.description} />
</svelte:head>

<div id="content" class="relative w-full pb-16">
    <data.Component />
</div>

<style lang="postcss">
	@reference '../../../../app.css';

	#content :global {
		& > h1 {
			@apply w-full text-3xl font-bold text-foreground;
		}

		& > h2 {
			@apply mb-4 mt-12 scroll-mt-[calc(4rem-2px)] border-t border-muted pt-6 text-2xl font-bold text-foreground;
		}

		& > h3 {
			@apply mb-4 mt-8 scroll-mt-20 text-xl font-bold text-foreground;
		}

		& > h4 {
			@apply mb-4 mt-8 scroll-mt-20 text-lg font-bold text-foreground;
		}

		& > p {
			@apply my-4 text-foreground;
		}

		& > ul {
			@apply my-4 flex list-disc flex-col gap-2 pl-10 text-foreground;
		}
	}
</style>
