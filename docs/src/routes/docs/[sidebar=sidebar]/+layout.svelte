<script lang="ts">
import { Backdrop, button, Paper } from "@sveltique/components";
import { motionSafe } from "@sveltique/components/utils";
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import IconMenuDeep from "@tabler/icons-svelte/icons/menu-deep";
import { setContext, untrack } from "svelte";
import { on } from "svelte/events";
import { fly } from "svelte/transition";
import { cnBase } from "tailwind-variants";
import { page } from "$app/state";
import { setOnThisPageContext } from "$lib/contexts/on-this-page.svelte.js";

let { children, data, params } = $props();

setContext("api_reference", data.apiReference);

const headings = setOnThisPageContext();

let showMenu = $state(false);
let showOnThisPage = $state(false);

let showOnThisPageButtonRef = $state<HTMLButtonElement>();
let showOnThisPageRef = $state<HTMLDivElement>();

$effect(() => {
	document.body.style.overflow = showMenu ? "hidden" : "auto";
});

$effect(() => {
	if (showMenu) {
		untrack(() => (showOnThisPage = false));
	} else if (showOnThisPage) {
		untrack(() => (showMenu = false));
	}
});

$effect(() => {
	if (!showOnThisPageButtonRef || !showOnThisPageRef) return;

	return on(
		window,
		"click",
		(event) => {
			const target = event.target;

			if (
				!target ||
				showOnThisPageButtonRef!.contains(target as Node) ||
				showOnThisPageRef!.contains(target as Node)
			) {
				return;
			}

			showOnThisPage = false;
		},
		{ passive: true }
	);
});
</script>

<div class="relative flex lg:flex-row flex-col w-full min-h-[100vh]">
	{@render componentsBar()}
	<div class="relative xl:flex-grow-[2] px-6 sm:px-12 2xl:px-32 xl:px-24 w-full">
		<div data-content class="relative mx-auto pt-12 xl:min-w-2xl max-w-2xl">
            {@render children()}
		</div>
	</div>
	{@render onThisPageBar()}
</div>

{#snippet componentsBar()}
	<aside
		class="hidden top-16 left-0 z-50 sticky lg:flex justify-end items-start p-6 pt-12 lg:pl-24 xl:pl-6 xl:w-full h-[calc(100vh-4rem)] overflow-auto"
	>
        <nav class="relative flex flex-col gap-5 w-60 font-semibold text-sm">
            {#each data.sidebar as { category, slugCategory, items } (category)}
                <div class="relative flex flex-col gap-2.5 w-full">
                    <span>{category}</span>
                    <div class="relative flex flex-col w-full">
                        {#each items as { name, slugName } (name)}
                            <a
                                href="/docs/{params.sidebar}/{slugCategory}/{slugName}"
                                class={cnBase(
                                    'py-1',
                                    page.url.pathname.endsWith(slugName)
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {name}
                            </a>
                        {/each}
                    </div>
                </div>
            {/each}
        </nav>
	</aside>

	<header
		class="lg:hidden top-0 left-0 z-20 sticky bg-background border-muted border-b w-full h-12"
	>
		<nav
			class="relative flex justify-between items-center px-6 w-full h-full font-medium text-muted-foreground text-sm"
		>
			<button
				onclick={() => (showMenu = true)}
				class="relative flex items-center gap-2.5 h-full cursor-pointer"
			>
				<IconMenuDeep class="w-4 h-4 scale-x-[-1]" />
				Menu
			</button>
			<button
                bind:this={showOnThisPageButtonRef}
				onclick={() => (showOnThisPage = !showOnThisPage)}
				class="relative flex items-center gap-2.5 h-full cursor-pointer"
			>
				On this page
				<IconChevronRight class="w-4 h-4" />
			</button>
		</nav>

        {#if showOnThisPage}
            <div transition:fly={{ y: -10, duration: motionSafe(0, 150) }}>
                <Paper
                    bind:ref={showOnThisPageRef}
                    class="top-[calc(100%-8px)] right-4 left-4 absolute flex shadow-md p-6 w-[calc(100%-2rem)]"
                >
                    <nav
                        class="relative flex flex-col justify-between items-start gap-6 w-full"
                    >
                        <div
                            class="relative flex flex-col justify-start items-start gap-2.5 w-full font-medium text-sm"
                        >
                            <h2 class="font-bold">On This Page</h2>
                            {#each headings.current as { id, label, items } (id)}
                                <a href="#{id}" onclick={() => (showOnThisPage = false)} class="text-muted-foreground">
                                    {label}
                                </a>
                                {#if items.length > 0}
                                    <div class="relative flex flex-col gap-2.5 pl-5 w-full">
                                        {#each items as item (item.id)}
                                            <a
                                                href="#{item.id}"
                                                onclick={() => (showOnThisPage = false)}
                                                class="text-muted-foreground"
                                            >
                                                {item.label}
                                            </a>
                                        {/each}
                                    </div>
                                {/if}
                            {/each}
                        </div>
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <a
                            href="#"
                            onclick={() => (showOnThisPage = false)}
                            class={button({ variant: 'outline', class: 'w-full text-sm' })}
                        >
                            Return to top
                        </a>
                    </nav>
                </Paper>
            </div>
        {/if}
	</header>

	{#if showMenu}
		<Backdrop
			onClick={() => (showMenu = false)}
			z={100}
			class="lg:hidden flex justify-start items-start"
		>
			<nav
				transition:fly={{ x: -100, duration: motionSafe(0, 150) }}
				class={cnBase([
                    "relative flex h-[100vh] w-4/5 max-w-[320px] flex-col items-start justify-start gap-5 overflow-auto bg-background",
                    "p-6 shadow-[0_0_12px_4px_rgba(0,0,0,0.15)] text-sm"
                ])}
			>
				{#each data.sidebar as { category, slugCategory, items } (category)}
                    <div class="relative flex flex-col gap-2.5 w-full">
                        <span class="font-bold">{category}</span>
                        <div class="relative flex flex-col w-full">
                            {#each items as { name, slugName } (name)}
                                <a
                                    href="/docs/{params.sidebar}/{slugCategory}/{slugName}"
                                    onclick={() => (showMenu = false)}
                                    class={cnBase(
                                        'py-1 font-semibold',
                                        page.url.pathname.endsWith(slugName)
                                            ? 'text-primary'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {name}
                                </a>
                            {/each}
                        </div>
                    </div>
                {/each}
			</nav>
		</Backdrop>
	{/if}
{/snippet}

{#snippet onThisPageBar()}
	<aside
		class="hidden xl:block top-28 right-0 z-50 sticky px-6 py-3 border-muted border-l w-full h-full"
	>
		<nav class="relative flex flex-col gap-2.5 h-full font-medium text-sm">
			<h2 class="font-bold text-foreground">On This Page</h2>
			{#each headings.current as { id, label, items } (id)}
				<a href="#{id}" class="text-muted-foreground">{label}</a>

				{#if items.length > 0}
					<div class="relative flex flex-col gap-2.5 pl-5 w-full">
						{#each items as item (item.label)}
							<a href="#{item.id}" class="text-muted-foreground">{item.label}</a>
						{/each}
					</div>
				{/if}
			{/each}
		</nav>
	</aside>
{/snippet}
