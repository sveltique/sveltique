<script lang="ts">
import { Backdrop, button, Paper } from "@sveltique/components";
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import IconMenuDeep from "@tabler/icons-svelte/icons/menu-deep";
import { untrack } from "svelte";
import { on } from "svelte/events";
import { fly } from "svelte/transition";
import { cnBase } from "tailwind-variants";
import { page } from "$app/state";
import { setOnThisPageContext } from "$lib/contexts/on-this-page.svelte.js";

let { children, data } = $props();

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

<div class="relative flex min-h-[100vh] w-full flex-col lg:flex-row">
	{@render componentsBar()}
	<div class="relative w-full xl:flex-grow-[2] px-6 sm:px-12 xl:px-24 2xl:px-32">
		<div data-content class="max-w-2xl xl:min-w-2xl relative mx-auto pt-12">
            {@render children()}
		</div>
	</div>
	{@render onThisPageBar()}
</div>

{#snippet componentsBar()}
	<aside
		class="sticky left-0 top-16 z-50 hidden h-[calc(100vh-4rem)] items-start justify-end overflow-auto p-6 lg:flex lg:pl-24 xl:pl-6 xl:w-full"
	>
		<nav class="relative w-80 flex flex-col gap-5 text-sm font-semibold">
			{#each data.sidebar as rootItem, index (index)}
				<div class="relative flex w-full flex-col gap-2.5">
					<span>{rootItem.name}</span>
					<div class="relative flex w-full flex-col">
						{#each rootItem.children as item (item.name)}
							<a
								href="/docs/components/{item.slugPath}"
								class={cnBase(
									'py-1',
									page.url.pathname.endsWith(item.slugPath)
										? 'text-primary'
										: 'text-muted-foreground'
								)}
							>
								{item.name}
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</nav>
	</aside>

	<header
		class="sticky left-0 top-0 z-50 h-12 w-full border-b border-muted bg-background lg:hidden"
	>
		<nav
			class="relative flex h-full w-full items-center justify-between px-6 text-sm font-medium text-muted-foreground"
		>
			<button
				onclick={() => (showMenu = true)}
				class="relative flex h-full cursor-pointer items-center gap-2.5"
			>
				<IconMenuDeep class="h-4 w-4 scale-x-[-1]" />
				Menu
			</button>
			<button
                bind:this={showOnThisPageButtonRef}
				onclick={() => (showOnThisPage = true)}
				class="relative flex h-full cursor-pointer items-center gap-2.5"
			>
				On this page
				<IconChevronRight class="h-4 w-4" />
			</button>
		</nav>

        {#if showOnThisPage}
            <div transition:fly={{ y: -10, duration: 150 }}>
                <Paper
                    bind:ref={showOnThisPageRef}
                    variant="outline"
                    class="absolute top-[calc(100%-8px)] left-4 right-4 flex w-[calc(100%-2rem)] p-6 shadow-md"
                >
                    <nav
                        class="relative w-full flex-col items-start justify-between"
                    >
                        <div
                            class="relative flex h-full w-full flex-col items-start justify-start gap-2.5 text-sm font-medium"
                        >
                            <div role="heading" aria-level="2" class="font-bold">On This Page</div>
                            {#each headings.current as { id, label, items } (id)}
                                <a href="#{id}" onclick={() => (showOnThisPage = false)} class="text-muted-foreground">
                                    {label}
                                </a>
                                {#if items.length > 0}
                                    <div class="relative flex w-full flex-col gap-2.5 pl-5">
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
			class="flex items-start justify-start lg:hidden"
		>
			<nav
				transition:fly={{ x: -100, duration: 150 }}
				class={cnBase([
                    "relative flex h-[100vh] w-4/5 max-w-[320px] flex-col items-start justify-start gap-5 overflow-auto bg-background",
                    "p-6 shadow-[0_0_12px_4px_rgba(0,0,0,0.15)] text-sm"
                ])}
			>
				{#each data.sidebar as rootItem, index (index)}
                    <div class="relative flex w-full flex-col gap-2.5">
                        <span class="font-bold">{rootItem.name}</span>
                        <div class="relative flex w-full flex-col">
                            {#each rootItem.children as item (item.name)}
                                <a
                                    href="/docs/components/{item.slugPath}"
                                    onclick={() => (showMenu = false)}
                                    class={cnBase(
                                        'py-1 font-semibold',
                                        page.url.pathname.endsWith(item.slugPath)
                                            ? 'text-primary'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {item.name}
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
		class="sticky right-0 top-28 z-50 hidden h-full w-full border-l border-muted px-6 py-3 xl:block"
	>
		<nav class="relative flex h-full flex-col gap-2.5 text-sm font-medium">
			<h2 class="font-bold text-foreground">On This Page</h2>
			{#each headings.current as { id, label, items } (id)}
				<a href="#{id}" class="text-muted-foreground">{label}</a>

				{#if items.length > 0}
					<div class="relative flex w-full flex-col gap-2.5 pl-5">
						{#each items as item (item.label)}
							<a href="#{item.id}" class="text-muted-foreground">{item.label}</a>
						{/each}
					</div>
				{/if}
			{/each}
		</nav>
	</aside>
{/snippet}
