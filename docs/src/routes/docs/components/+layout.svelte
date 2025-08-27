<script lang="ts">
import { Backdrop, button } from "@sveltique/components";
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import IconMenuDeep from "@tabler/icons-svelte/icons/menu-deep";
import { untrack } from "svelte";
import { fly } from "svelte/transition";
import { cnBase } from "tailwind-variants";
import { page } from "$app/state";
import { setOnThisPageContext } from "$lib/contexts/on-this-page.svelte.js";

let { children, data } = $props();

const headings = setOnThisPageContext();

let showMenu = $state(false);
let showOnThisPage = $state(false);

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
</script>

<div class="relative flex min-h-[100vh] w-full flex-col lg:flex-row">
	{@render componentsBar()}
	<div class="md:px-18 relative w-full px-6 sm:px-12 lg:px-12 xl:px-32">
		<div data-content class="lg:w-xl xl:w-2xl relative mx-auto pt-12">
            {@render children()}
		</div>
	</div>
	{@render onThisPageBar()}
</div>

{#snippet componentsBar()}
	<aside
		class="sticky left-0 top-16 z-50 hidden h-[calc(100vh-4rem)] items-start justify-end overflow-auto bg-zinc-50 p-6 lg:flex xl:w-full dark:bg-zinc-800"
	>
		<nav class="relative flex min-w-[240px] flex-col gap-5 text-sm font-bold">
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
		class="sticky left-0 top-0 z-50 h-12 w-full border-b border-zinc-300 bg-white lg:hidden dark:border-zinc-700 dark:bg-zinc-900"
	>
		<nav
			class="relative flex h-full w-full items-center justify-between px-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
		>
			<button
				onclick={() => (showMenu = true)}
				class="relative flex h-full cursor-pointer items-center gap-2.5"
			>
				<IconMenuDeep class="h-4 w-4 scale-x-[-1]" />
				Menu
			</button>
			<button
				onclick={() => (showOnThisPage = true)}
				class="relative flex h-full cursor-pointer items-center gap-2.5"
			>
				On this page
				<IconChevronRight class="h-4 w-4" />
			</button>
		</nav>
	</header>

	{#if showMenu}
		<Backdrop
			onClick={() => (showMenu = false)}
			z={100}
			class="flex items-start justify-start lg:hidden"
		>
			<nav
				transition:fly={{ x: -100, duration: 150 }}
				class="relative flex h-[100vh] w-60 flex-col items-start justify-start overflow-auto bg-white p-6 shadow-[0_0_12px_4px_rgba(0,0,0,0.15)] dark:bg-zinc-800"
			>
				<!-- {#each data.componentNames as name, index (index)}
					<a
						href="/docs/components/browse/{name}"
						class={cnBase(
							'py-1',
							page.url.pathname.endsWith(name) ? 'text-blue-700' : 'text-zinc-600'
						)}
					>
						{capitalize(name)}
					</a>
				{/each} -->
			</nav>
		</Backdrop>
	{/if}

	{#if showOnThisPage}
		<Backdrop
			onClick={() => (showOnThisPage = false)}
			z={100}
			class="flex items-start justify-end lg:hidden"
		>
			<nav
				transition:fly={{ x: 100, duration: 150 }}
				class="relative flex h-[100vh] w-60 flex-col items-start justify-between bg-white p-6 shadow-[0_0_12px_4px_rgba(0,0,0,0.15)] dark:bg-zinc-800"
			>
				<div
					class="relative flex h-full w-full flex-col items-start justify-start gap-2.5 text-sm font-medium"
				>
					<div role="heading" aria-level="2" class="font-bold">On This Page</div>
					{#each headings.current as { id, label, items } (id)}
						<a href="#{id}" class="text-zinc-600 dark:text-zinc-400">{label}</a>
						{#if items.length > 0}
							<div class="relative flex w-full flex-col gap-2.5 pl-5">
								{#each items as item (item.id)}
									<a href="#{item.id}" class="text-zinc-600 dark:text-zinc-400">{item.label}</a>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a href="#" class={button({ variant: 'text', class: 'w-full self-end text-blue-700' })}>
					Return to top
				</a>
			</nav>
		</Backdrop>
	{/if}
{/snippet}

{#snippet onThisPageBar()}
	<aside
		class="sticky right-0 top-28 z-50 hidden h-full w-full border-l border-muted px-6 py-3 xl:block"
	>
		<nav class="relative flex h-full flex-col gap-2.5 text-sm font-medium">
			<div role="heading" aria-level="2" class="font-bold text-foreground">On This Page</div>
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
