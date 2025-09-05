<script lang="ts">
import { Button, button, Link, Separator, Tooltip } from "@sveltique/components";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconMenuDeep from "@tabler/icons-svelte/icons/menu-deep";
import IconMoonFilled from "@tabler/icons-svelte/icons/moon-filled";
import IconSunFilled from "@tabler/icons-svelte/icons/sun-filled";
import IconX from "@tabler/icons-svelte/icons/x";
import { cnBase } from "tailwind-variants";
import { page } from "$app/state";
import { theme } from "$lib/contexts/theme.svelte";

interface Props {
	version: string;
}

let { version }: Props = $props();

let showMenu = $state(false);

let MobileMenuIcon = $derived(showMenu ? IconX : IconMenuDeep);
let ThemeIcon = $derived(theme.isDark ? IconSunFilled : IconMoonFilled);
</script>

<header
    class="sticky left-0 top-0 z-50 hidden h-16 w-full border-b border-muted bg-background lg:block"
>
    <nav
        class="relative flex h-full w-full items-center justify-between gap-6 px-6 max-w-[94rem] mx-auto dark:text-zinc-100"
    >
        <div class="relative flex items-center gap-10">
            <Tooltip title="Go to home page">
                {#snippet children({ props, ref })}
                    <a
                        bind:this={ref.current}
                        href="/"
                        class="font-bold"
                        {...props}
                    >
                        SVELTIQUE
                    </a>
                {/snippet}
            </Tooltip>
        </div>
        <div class="flex items-center gap-3 py-4">
            <a
                href="/docs/components"
                class={cnBase(
                    "text-sm px-3 py-1.5 duration-150 hover:text-primary",
                    page.url.pathname.startsWith('/docs/components') && "text-primary"
                )}
            >
                Components
            </a>
            <Separator orientation="vertical" />
            <Tooltip title="See the release notes">
                {#snippet children({ props, ref })}
                    <a
                        bind:this={ref.current}
                        href="https://github.com/sveltique/sveltique/releases"
                        target="_blank"
                        rel="noreferrer"
                        class={button({ variant: "text" })}
                        {...props}
                    >
                        v{version}
                    </a>
                {/snippet}
            </Tooltip>
            <Separator orientation="vertical" />
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
            <Tooltip title="Switch to {theme.isDark ? 'light' : 'dark'} mode">
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
        <a href="/" onclick={() => (showMenu = false)} class="font-bold">
            SVELTIQUE
        </a>
        <button
            onclick={() => (showMenu = !showMenu)}
            class="grid h-full place-items-center cursor-pointer"
        >
            <MobileMenuIcon />
        </button>
    </nav>

    {#if showMenu}
        <div class="fixed top-16 left-0 flex w-full flex-col h-[calc(100vh-4rem)] z-50 p-6 bg-background gap-12">
            <menu class="relative w-full flex flex-col gap-3">
                <li>
                    <a
                        href="/docs/components"
                        onclick={() => (showMenu = false)}
                        class={cnBase(
                            "px-3 py-1.5",
                            page.url.pathname.startsWith('/docs/components') && "text-primary"
                        )}
                    >
                        Components
                    </a>
                </li>
                <li>
                    <Link
                        href="https://github.com/sveltique/sveltique/releases"
                        external
                        onclick={() => (showMenu = false)}
                        class="px-3 py-1.5"
                    >
                        Releases
                    </Link>
                </li>
            </menu>
            <Separator />
            <div class="relative w-full flex justify-center items-center gap-3">
                <a
                    href="https://github.com/sveltique/sveltique"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="See the Github repository in another tab."
                    class={button({ variant: "text", shape: "square" })}
                >
                    <IconBrandGithub class="h-5 w-5" />
                </a>
                <Button
                    onclick={() => theme.switch()}
                    variant="text"
                    shape="square"
                >
                    <ThemeIcon class="h-5 w-5" />
                </Button>
            </div>
        </div>
    {/if}
</header>
