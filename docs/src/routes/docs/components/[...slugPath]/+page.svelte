<script lang="ts">
import { button, Separator } from "@sveltique/components";

let { data } = $props();
</script>

<svelte:head>
	<title>{data.name} - @sveltique/components</title>
	<meta name="description" content={data.metadata?.description} />
</svelte:head>

<div class="relative w-full pb-16 flex flex-col gap-12">
    <div id="content" class="relative w-full">
        <data.Component />
    </div>
    <Separator />
    <div class="relative w-full flex flex-col sm:flex-row items-center gap-6">
        {#if data.previous}
            <a
                href="/docs/components/{data.previous.slugPath}"
                class={button({ variant: "outline", class: "w-full px-4 py-3 rounded-large flex flex-col items-start gap-1" })}
            >
                <span class="text-muted-foreground font-medium text-xs">Previous page</span>
                <span class="text-primary font-bold text-base">{data.previous.name}</span>
            </a>
        {:else}
            <div class="w-full"></div>
        {/if}
        {#if data.next}
            <a
                href="/docs/components/{data.next.slugPath}"
                class={button({ variant: "outline", class: "w-full px-4 py-3 rounded-large flex flex-col items-end gap-1" })}
            >
                <span class="text-muted-foreground font-medium text-xs">Next page</span>
                <span class="text-primary font-bold text-base">{data.next.name}</span>
            </a>
        {:else}
            <div class="w-full"></div>
        {/if}
    </div>
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
