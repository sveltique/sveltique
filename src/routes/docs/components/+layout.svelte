<script lang="ts">
	import { capitalize } from '$utils/string.js';
	import { Separator } from '$components';
	import { setContext } from 'svelte';
	import { setOnThisPageContext } from '$lib/contexts/on-this-page.svelte.js';

	let { children, data } = $props();

	const headings = setOnThisPageContext();
	let treeArr = $derived(Object.entries(data.tree));
</script>

<div class="relative flex min-h-[100vh] w-full">
	<aside class="fixed top-16 left-0 z-50 h-full w-[300px] border-r border-grey-soft p-6">
		<nav class="relative flex h-full flex-col gap-5">
			<p>Components</p>
			<Separator />
			{#each treeArr as [category, names], index (index)}
				<div class="relative flex flex-col gap-2.5">
					<p class="font-bold">{capitalize(category)}</p>
					{#each names as name (name)}
						<a href="/docs/components/{category}/{name}">{capitalize(name)}</a>
					{/each}
				</div>
			{/each}
		</nav>
	</aside>
	<div class="relative w-full px-[300px]">
		<div class="relative mx-auto w-full max-w-3xl">{@render children()}</div>
	</div>
	<aside class="fixed top-16 right-0 z-50 h-full w-[300px] border-l border-grey-soft p-6">
		<nav class="relative flex h-full flex-col gap-5">
			<p>On This Page</p>
			{#each headings.current as { id, label, items } (id)}
				<a href="#{id}">{label}</a>

				{#if items.length > 0}
					<div class="relative flex w-full flex-col gap-2.5 pl-5">
						{#each items as item (item.id)}
							<a href="#{item.id}" class="text-sm">{item.label}</a>
						{/each}
					</div>
				{/if}
			{/each}
		</nav>
	</aside>
</div>
