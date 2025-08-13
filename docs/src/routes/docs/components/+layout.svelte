<script lang="ts">
	import { untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/state';
	import { cnBase } from 'tailwind-variants';
	import { Backdrop, button } from '@sveltique/components';

	import { setOnThisPageContext } from '$lib/contexts/on-this-page.svelte.js';
	import { capitalize } from '$utils/string.js';
	import IconMenuDeep from '@tabler/icons-svelte/icons/menu-deep';
	import IconChevronRight from '@tabler/icons-svelte/icons/chevron-right';

	let { children, data } = $props();

	const headings = setOnThisPageContext();

	let showMenu = $state(false);
	let showOnThisPage = $state(false);

	let treeArr = $derived(Object.entries(data.tree));

	$effect(() => {
		document.body.style.overflow = showMenu ? 'hidden' : 'auto';
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
	<div class="relative w-full px-6 lg:px-32">
		<div class="lg:w-2xl relative mx-auto pt-12">
			<svelte:boundary>
				{@render children()}

				{#snippet pending()}
					<p>loading...</p>
				{/snippet}
			</svelte:boundary>
		</div>
	</div>
	{@render onThisPageBar()}
</div>

{#snippet componentsBar()}
	<aside
		class="sticky left-0 top-16 z-50 hidden h-[calc(100vh-4rem)] w-full items-start justify-end bg-zinc-50 p-6 lg:flex"
	>
		<nav class="relative flex h-full min-w-[200px] flex-col">
			{#each treeArr as [category, names], index (index)}
				<div
					class={cnBase(
						'relative flex flex-col pb-6 text-sm font-medium',
						index !== 0 && 'border-t border-zinc-300 pt-2.5'
					)}
				>
					<div role="heading" aria-level="2" class="pb-1 font-bold">{capitalize(category)}</div>
					{#each names as name (name)}
						<a
							href="/docs/components/{category}/{name}"
							class={cnBase(
								'py-1',
								page.url.pathname.endsWith(name) ? 'text-blue-700' : 'text-zinc-600'
							)}
						>
							{capitalize(name)}
						</a>
					{/each}
				</div>
			{/each}
		</nav>
	</aside>

	<header class="sticky left-0 top-0 z-50 h-12 w-full border-b border-zinc-300 bg-white lg:hidden">
		<nav
			class="relative flex h-full w-full items-center justify-between px-6 text-sm font-medium text-zinc-600"
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
				class="relative flex h-[100vh] w-60 flex-col items-start justify-start overflow-auto bg-white p-6 shadow-[0_0_12px_4px_rgba(0,0,0,0.15)]"
			>
				{#each treeArr as [category, names], index (index)}
					<div
						class={cnBase(
							'relative flex w-full flex-col pb-6 text-sm font-medium',
							index !== 0 && 'border-t border-zinc-300 pt-2.5'
						)}
					>
						<div role="heading" aria-level="2" class="pb-1 font-bold">{capitalize(category)}</div>
						{#each names as name (name)}
							<a
								href="/docs/components/{category}/{name}"
								class={cnBase(
									'py-1',
									page.url.pathname.endsWith(name) ? 'text-blue-700' : 'text-zinc-600'
								)}
							>
								{capitalize(name)}
							</a>
						{/each}
					</div>
				{/each}
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
				class="relative flex h-[100vh] w-60 flex-col items-start justify-between bg-white p-6 shadow-[0_0_12px_4px_rgba(0,0,0,0.15)]"
			>
				<div
					class="relative flex h-full w-full flex-col items-start justify-start gap-2.5 text-sm font-medium"
				>
					<div role="heading" aria-level="2" class="font-bold">On This Page</div>
					{#each headings.current as { id, label, items } (id)}
						<a href="#{id}" class="text-zinc-600">{label}</a>
						{#if items.length > 0}
							<div class="relative flex w-full flex-col gap-2.5 pl-5">
								{#each items as item (item.id)}
									<a href="#{item.id}" class="text-zinc-600">{item.label}</a>
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
		class="sticky right-0 top-28 z-50 hidden h-full w-full border-l border-zinc-300 px-6 py-3 lg:block"
	>
		<nav class="relative flex h-full flex-col gap-2.5 text-sm font-medium">
			<div role="heading" aria-level="2" class="font-bold">On This Page</div>
			{#each headings.current as { id, label, items } (id)}
				<a href="#{id}" class="text-zinc-600">{label}</a>

				{#if items.length > 0}
					<div class="relative flex w-full flex-col gap-2.5 pl-5">
						{#each items as item (item.id)}
							<a href="#{item.id}" class="text-zinc-600">{item.label}</a>
						{/each}
					</div>
				{/if}
			{/each}
		</nav>
	</aside>
{/snippet}
