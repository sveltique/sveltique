<script lang="ts">
import {
	Alert,
	Button,
	button,
	Drawer,
	Field,
	Link,
	Select,
	Separator,
	Tooltip
} from "@sveltique/components";
import IconAdjustments from "@tabler/icons-svelte/icons/adjustments";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconMenuDeep from "@tabler/icons-svelte/icons/menu-deep";
import IconMoonFilled from "@tabler/icons-svelte/icons/moon-filled";
import IconSunFilled from "@tabler/icons-svelte/icons/sun-filled";
import IconX from "@tabler/icons-svelte/icons/x";
import { cnBase } from "tailwind-variants";
import { page } from "$app/state";
import { sveltiqueProvider } from "$lib/contexts/sveltique.svelte";
import { theme } from "$lib/contexts/theme.svelte";
import { toTitleCase } from "$utils/string";

interface Props {
	version: string;
}

let { version }: Props = $props();

let showMenu = $state(false);

let MobileMenuIcon = $derived(showMenu ? IconX : IconMenuDeep);
let ThemeIcon = $derived(theme.isDark ? IconSunFilled : IconMoonFilled);
</script>

<header
    class="hidden lg:block top-0 left-0 z-50 sticky bg-background border-muted border-b w-full h-16"
>
    <nav
        class="relative flex justify-between items-center gap-6 mx-auto px-6 w-full max-w-[94rem] h-full dark:text-zinc-100"
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
            <a
                href="/docs/patterns"
                class={cnBase(
                    "text-sm px-3 py-1.5 duration-150 hover:text-primary",
                    page.url.pathname.startsWith('/docs/patterns') && "text-primary"
                )}
            >
                Patterns
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
                        <IconBrandGithub class="w-5 h-5" />
                    </a>
                {/snippet}
            </Tooltip>
            {@render settings()}
        </div>
    </nav>
</header>

<header
    class="lg:hidden top-0 left-0 z-50 relative bg-background border-muted border-b w-full h-16"
>
    <nav class="relative flex justify-between items-center px-6 w-full h-full">
        <a href="/" onclick={() => (showMenu = false)} class="font-bold">
            SVELTIQUE
        </a>
        <div class="relative flex items-center gap-3 h-full">
            {@render settings()}
            <Button
                onclick={() => (showMenu = !showMenu)}
                variant="text"
                shape="square"
                class="-mr-2"
                aria-label={showMenu ? "Close menu" : "Show menu"}
            >
                <MobileMenuIcon />
            </Button>
        </div>
    </nav>

    {#if showMenu}
        <div class="top-16 left-0 z-50 fixed flex flex-col gap-6 bg-background p-6 w-full h-[calc(100vh-4rem)]">
            <menu class="relative flex flex-col gap-3 w-full">
                <li>
                    <a
                        href="/docs/components"
                        onclick={() => (showMenu = false)}
                        class={cnBase(
                            "py-1.5",
                            page.url.pathname.startsWith('/docs/components') && "text-primary"
                        )}
                    >
                        Components
                    </a>
                </li>
                <li>
                    <a
                        href="/docs/patterns"
                        onclick={() => (showMenu = false)}
                        class={cnBase(
                            "py-1.5",
                            page.url.pathname.startsWith('/docs/patterns') && "text-primary"
                        )}
                    >
                        Patterns
                    </a>
                </li>
            </menu>
            <Separator />
            <menu class="relative flex flex-col gap-3 w-full">
                <li>
                    <Link
                        href="https://github.com/sveltique/sveltique/releases"
                        external
                        onclick={() => (showMenu = false)}
                        class="py-1.5"
                    >
                        Releases
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://github.com/sveltique/sveltique"
                        external
                        aria-label="See the Github repository in another tab."
                        class="py-1.5"
                    >
                        Github
                    </Link>
                </li>
            </menu>
        </div>
    {/if}
</header>

{#snippet settings()}
    <Drawer closeOnOverlayClick backdropProps={{ z: 1000 }}>
        {#snippet trigger({ open, ref })}
            <Button
                bind:ref={ref.current}
                onclick={open}
                variant="text"
                shape="square"
                aria-label="Open settings"
            >
                <IconAdjustments />
            </Button>
        {/snippet}

        {#snippet children({ labelProps, descriptionProps })}
            <div class="relative flex flex-col gap-6 w-full">
                <div class="relative flex flex-col gap-3 w-full">
                    <h2 class="font-bold text-2xl" {...labelProps}>Settings</h2>
                    <p {...descriptionProps}>Adjust your documentation preferences.</p>
                    <Alert class="p-4 text-sm">Additional settings will be available soon.</Alert>
                </div>
                <div class="relative flex flex-col gap-3 w-full">
                    <Field label="Theme" placement="left" controlProps={{ class: "w-full justify-between" }}>
                        {#snippet input({ props })}
                            <Button
                                onclick={() => theme.switch()}
                                variant="text"
                                shape="square"
                                {...props}
                            >
                                <ThemeIcon class="w-5 h-5" />
                            </Button>
                        {/snippet}
                    </Field>
                    <Field label="Animation" placement="left" controlProps={{ class: "w-full justify-between" }}>
                        {#snippet input({ props })}
                            <Select.Root
                                bind:value={sveltiqueProvider.animation}
                                containerProps={{ class: "w-32 [&_[data-select-listbox]]:bg-inherit" }}
                                class="bg-inherit"
                                {...props}
                            >
                                {#each ["system", "always", "never"] as animation (animation)}
                                    <Select.Option value={animation}>
                                        {toTitleCase(animation)}
                                    </Select.Option>
                                {/each}
                            </Select.Root>
                        {/snippet}
                    </Field>
                </div>
            </div>
        {/snippet}

        {#snippet actions({ close })}
            <Button onclick={close} variant="text">Close</Button>
        {/snippet}
    </Drawer>
{/snippet}
