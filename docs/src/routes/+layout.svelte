<script lang="ts">
	import { theme } from '$lib/contexts/theme.svelte';
	import { Button } from '@sveltique/components';
	import '../app.css';
	import IconMenuDeep from '@tabler/icons-svelte/icons/menu-deep';

	let { children } = $props();

	let showMenu = $state(false);
</script>

<div class="relative w-full">
	{@render navigation()}
	<div class="relative w-full">
		{@render children()}
	</div>
</div>

{#snippet navigation()}
	<header
		class="sticky left-0 top-0 z-50 hidden h-16 w-full border-b border-zinc-300 bg-white lg:block dark:border-zinc-700 dark:bg-zinc-900"
	>
		<nav class="relative flex w-full items-center justify-center gap-5 dark:text-zinc-100">
			<a href="/">home</a>
			<a href="/docs/components">components</a>
			<Button onclick={() => theme.switch()} variant="outline" size="small">{theme.current}</Button>
		</nav>
	</header>

	<header
		class="relative left-0 top-0 z-50 h-16 w-full border-b border-zinc-300 bg-white lg:hidden dark:border-zinc-700 dark:bg-zinc-900"
	>
		<nav class="relative flex h-full w-full items-center justify-between px-6">
			<a href="/" class="text-xl font-black dark:text-zinc-100">C</a>
			<button onclick={() => (showMenu = !showMenu)} class="grid h-full place-items-center">
				<IconMenuDeep />
			</button>
		</nav>
	</header>

	{#if showMenu}
		<div class="fixed top-16 flex w-full flex-col">
			<a href="/docs/components/browse">Components</a>
		</div>
	{/if}
{/snippet}
