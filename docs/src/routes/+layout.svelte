<script lang="ts">
import { Button, button, Separator, Tooltip } from "@sveltique/components";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconMenuDeep from "@tabler/icons-svelte/icons/menu-deep";
import IconMoonFilled from "@tabler/icons-svelte/icons/moon-filled";
import IconSunFilled from "@tabler/icons-svelte/icons/sun-filled";
import ToastContainer from "$components/toast/ToastContainer.svelte";
import { theme } from "$lib/contexts/theme.svelte";
import "../app.css";

let { children } = $props();

let showMenu = $state(false);
let ThemeIcon = $derived(theme.isDark ? IconSunFilled : IconMoonFilled);
</script>

<ToastContainer />
<div class="relative w-full">
	{@render navigation()}
	<div class="relative w-full">
		{@render children()}
	</div>
</div>

{#snippet navigation()}
	<header
		class="sticky left-0 top-0 z-50 hidden h-16 w-full border-b border-muted bg-background lg:block"
	>
		<nav
			class="relative flex h-full w-full items-center justify-between gap-5 px-20 dark:text-zinc-100"
		>
			<div class="relative flex items-center gap-10">
				<a href="/" class="font-bold">SVELTIQUE</a>
				<a href="/docs/components">Components</a>
			</div>
			<div class="flex items-center gap-6 py-4">
                <Tooltip title="Go to the Github repository">
                    {#snippet children({ props, ref })}
                        <a
                            bind:this={ref.current}
                            href="https://github.com/sveltique/sveltique"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="See the Github repository in another tab."
                            class={button({ variant: "text", shape: "square" })}
                            {...props}
                        >
                            <IconBrandGithub class="h-5 w-5" />
                        </a>
                    {/snippet}
                </Tooltip>
                <Separator orientation="vertical" />
                <Tooltip title="Switch to {theme.isDark ? "light" : "dark"} mode">
                    {#snippet children({ props, ref })}
                        <Button
                            bind:ref={ref.current}
                            onclick={() => theme.switch()}
                            variant="text"
                            shape="square"
                            {...props}
                        >
                            <ThemeIcon class="h-5 w-5" />
                        </Button>
                    {/snippet}
                </Tooltip>
            </div>
		</nav>
	</header>

	<header
		class="relative left-0 top-0 z-50 h-16 w-full border-b border-muted bg-background lg:hidden"
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
			<a href="/docs/components/browse"><!-- Components --></a>
		</div>
	{/if}
{/snippet}
