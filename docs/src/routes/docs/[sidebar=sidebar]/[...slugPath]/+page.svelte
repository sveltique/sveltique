<script lang="ts">
import { button, Separator } from "@sveltique/components";
import { getContext } from "svelte";
import { page } from "$app/state";
import ApiReference from "$components/api-reference/APIReference.svelte";
import type { SimplifiedGroup } from "$lib/reference/generator.js";

let { data, params } = $props();

const apiReference = getContext<SimplifiedGroup[]>("api_reference");

let name = $derived(page.url.pathname.split("/").at(-1));
let group = $derived(apiReference.find((group) => group.name === name));
</script>

<svelte:head>
	<title>{data.name} - sveltique/components</title>
	<meta name="description" content={data.metadata?.description} />
</svelte:head>

<div class="relative flex flex-col gap-12 pb-16 w-full">
    <div id="content" class="relative w-full">
        <data.Component />

        {#if group}
            <ApiReference {group} />
        {/if}
    </div>
    <Separator />
    <div class="relative flex sm:flex-row flex-col justify-between items-center gap-6 w-full">
        {#if data.previous}
            <a
                href="/docs/{params.sidebar}/{data.previous.slugCategory}/{data.previous.slugName}"
                class={button({ variant: "outline", class: "flex-1 px-4 py-3 h-auto rounded-2xl flex flex-col items-start gap-1" })}
            >
                <span class="font-medium text-muted-foreground text-xs">Previous page</span>
                <span class="font-bold text-primary text-base">{data.previous.name}</span>
            </a>
        {:else}
            <div class="flex-1"></div>
        {/if}
        {#if data.next}
            <a
                href="/docs/{params.sidebar}/{data.next.slugCategory}/{data.next.slugName}"
                class={button({ variant: "outline", class: "flex-1 px-4 py-3 h-auto rounded-2xl flex flex-col items-end gap-1" })}
            >
                <span class="font-medium text-muted-foreground text-xs">Next page</span>
                <span class="font-bold text-primary text-base">{data.next.name}</span>
            </a>
        {:else}
            <div class="flex-1"></div>
        {/if}
    </div>
</div>

<style lang="postcss">
	@reference '../../../../app.css';

	#content :global {
		& > h1 {
			@apply w-full font-bold text-foreground text-3xl;
		}

		& > h2 {
			@apply mt-12 mb-4 pt-6 border-muted border-t font-bold text-foreground text-2xl scroll-mt-[calc(4rem-2px)];
		}

		& > h3 {
			@apply mt-8 mb-4 font-bold text-foreground text-xl scroll-mt-20;
		}

		& > h4 {
			@apply mt-8 mb-4 font-bold text-foreground text-lg scroll-mt-20;
		}

		& > p {
			@apply my-4 text-foreground;
		}

		& > ul {
			@apply flex flex-col gap-2 my-4 pl-10 text-foreground list-disc;
		}
	}
</style>
