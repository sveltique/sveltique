<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	children?: Snippet;
}

let { children }: Props = $props();
</script>

<div id="content" class="relative w-full pb-16">
    {@render children?.()}
</div>

<style lang="postcss">
	@reference '../../app.css';

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
