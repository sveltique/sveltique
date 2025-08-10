<script lang="ts">
	import { capitalize } from '$utils/string.js';
	import { setOnThisPageContext } from '$lib/contexts/on-this-page.svelte.js';
	import { cnBase } from 'tailwind-variants';
	import { page } from '$app/state';

	let { children, data } = $props();

	const headings = setOnThisPageContext();
	let treeArr = $derived(Object.entries(data.tree));
</script>

<div class="relative flex min-h-[100vh] w-full">
	<aside
		class="sticky left-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-full items-start justify-end bg-zinc-50 p-6"
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
								page.url.pathname.endsWith(name) ? 'text-primary' : 'text-zinc-600'
							)}
						>
							{capitalize(name)}
						</a>
					{/each}
				</div>
			{/each}
		</nav>
	</aside>
	<div class="relative w-full px-32">
		<div class="w-2xl relative mx-auto pt-12">
			<svelte:boundary>
				{@render children()}

				{#snippet pending()}
					<p>loading...</p>
				{/snippet}
			</svelte:boundary>
		</div>
	</div>
	<aside class="border-grey-soft sticky right-0 top-28 z-50 h-full w-full border-l px-6 py-3">
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
</div>
