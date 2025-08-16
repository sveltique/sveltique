<script lang="ts">
	import { untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/state';
	import { cnBase } from 'tailwind-variants';
	import { Backdrop, Button, button, Separator } from '@sveltique/components';
	import { setOnThisPageContext } from '$lib/contexts/on-this-page.svelte.js';
	import { capitalize } from '$utils/string.js';

	import IconMenuDeep from '@tabler/icons-svelte/icons/menu-deep';
	import IconChevronRight from '@tabler/icons-svelte/icons/chevron-right';
	import IconChevronDown from '@tabler/icons-svelte/icons/chevron-down';
	import IconSettingsCheck from '@tabler/icons-svelte/icons/settings-check';
	import IconHelp from '@tabler/icons-svelte/icons/help';
	import IconTable from '@tabler/icons-svelte/icons/table';

	let { children, data } = $props();

	const headings = setOnThisPageContext();

	let showMenu = $state(false);
	let showOnThisPage = $state(false);
	let showComponentsMenu = $state(page.url.pathname.startsWith('/docs/components/browse/'));

	$effect(() => {
		document.body.style.overflow = showMenu ? 'hidden' : 'auto';
	});

	$effect(() => {
		page.url.pathname && headings.getFromDOM();
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
		class="sticky left-0 top-16 z-50 hidden h-[calc(100vh-4rem)] w-full items-start justify-end overflow-auto bg-zinc-50 p-6 lg:flex dark:bg-zinc-800"
	>
		<nav class="relative flex min-w-[240px] flex-col gap-1">
			<a
				href="/docs/components/installation"
				class={button({
					variant: 'text',
					size: 'small',
					class: [
						'justify-start font-bold',
						page.url.pathname === '/docs/components/installation' ? 'text-black' : 'text-zinc-500'
					]
				})}
			>
				<IconSettingsCheck /> Installation
			</a>
			<a
				href="/docs/components/usage"
				class={button({
					variant: 'text',
					size: 'small',
					class: [
						'justify-start font-bold',
						page.url.pathname === '/docs/components/usage' ? 'text-black' : 'text-zinc-500'
					]
				})}
			>
				<IconHelp /> Usage
			</a>
			<Button
				onclick={() => (showComponentsMenu = !showComponentsMenu)}
				variant="text"
				size="small"
				class={['justify-between font-bold', showComponentsMenu ? 'text-black' : 'text-zinc-500']}
			>
				<div class="flex items-center gap-5">
					<IconTable /> Components
				</div>
				<IconChevronDown
					class={cnBase(
						'aspect-square h-5 shrink-0 duration-150',
						showComponentsMenu && 'rotate-180'
					)}
				/>
			</Button>
			{#if showComponentsMenu}
				<div class="flex flex-col gap-1 pl-[60px] text-sm">
					<a
						href="/docs/components/browse"
						class={cnBase(
							'py-1',
							page.url.pathname === '/docs/components/browse'
								? 'text-blue-700 dark:text-blue-300'
								: 'text-zinc-600 dark:text-zinc-400'
						)}
					>
						All components
					</a>
					<Separator class="my-2" />
					{#each data.componentNames as name, index (index)}
						<a
							href="/docs/components/browse/{name}"
							class={cnBase(
								'py-1',
								page.url.pathname.endsWith(name)
									? 'text-blue-700 dark:text-blue-300'
									: 'text-zinc-600 dark:text-zinc-400'
							)}
						>
							{capitalize(name)}
						</a>
					{/each}
				</div>
			{/if}
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
				{#each data.componentNames as name, index (index)}
					<a
						href="/docs/components/browse/{name}"
						class={cnBase(
							'py-1',
							page.url.pathname.endsWith(name) ? 'text-blue-700' : 'text-zinc-600'
						)}
					>
						{capitalize(name)}
					</a>
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
		class="sticky right-0 top-28 z-50 hidden h-full w-full border-l border-zinc-300 px-6 py-3 lg:block dark:border-zinc-700"
	>
		<nav class="relative flex h-full flex-col gap-2.5 text-sm font-medium">
			<div role="heading" aria-level="2" class="font-bold dark:text-zinc-100">On This Page</div>
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
		</nav>
	</aside>
{/snippet}
