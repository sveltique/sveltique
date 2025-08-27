<script lang="ts">
import { Button, Separator } from "@sveltique/components";
import { theme } from "$lib/contexts/theme.svelte";
import "../app.css";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconMenuDeep from "@tabler/icons-svelte/icons/menu-deep";
import IconMoonFilled from "@tabler/icons-svelte/icons/moon-filled";
import IconSunFilled from "@tabler/icons-svelte/icons/sun-filled";

let { children } = $props();

let showMenu = $state(false);
let ThemeIcon = $derived(theme.isDark ? IconSunFilled : IconMoonFilled);
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
		<nav
			class="relative flex h-full w-full items-center justify-between gap-5 px-20 dark:text-zinc-100"
		>
			<div class="relative flex items-center gap-10">
				<a href="/" class="font-bold">SVELTIQUE</a>
				<a href="/docs/components">Components</a>
			</div>
			<div class="flex items-center gap-6 py-4">
                <a href="https://github.com/sveltique/sveltique" title="Go to Github repository">
                    <IconBrandGithub />
                </a>
                <Separator orientation="vertical" />
                <Button onclick={() => theme.switch()} variant="text" shape="square">
                    <ThemeIcon class="h-5 w-5" />
                </Button>
            </div>
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
