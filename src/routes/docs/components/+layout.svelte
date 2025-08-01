<script lang="ts">
	import { capitalize, toTitleCase } from '$utils/string.js';
	import { Separator } from '$components';

	let { children, data } = $props();

	let treeArr = $derived(Object.entries(data.tree));
</script>

<div class="relative flex min-h-[100vh] w-full">
	<aside class="fixed top-16 left-0 z-50 h-full w-[300px] border-r border-zinc-300 p-6">
		<nav class="relative flex h-full flex-col gap-5">
			<p>Components</p>
			<Separator />
			{#each treeArr as [category, names], index (index)}
				<div class="relative flex flex-col gap-2.5">
					<p class="font-bold">{capitalize(category)}</p>
					{#each names as name (name)}
						<a href="/docs/components/{category}/{name}">{toTitleCase(name)}</a>
					{/each}
				</div>
			{/each}
		</nav>
	</aside>
	<div class="relative w-full pl-[300px]">
		<div class="relative mx-auto w-full max-w-3xl">{@render children()}</div>
	</div>
</div>
