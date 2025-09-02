<script lang="ts">
import { button } from "@sveltique/components";
</script>

<svelte:head>
    <title>Fulfill all your design-related needs - Sveltique</title>
    <meta
        name="description"
        content="Build beautiful and consistent user interfaces with ready-to-use components, a cohesive design system and Tailwind's flexibility."
    />
</svelte:head>

<div class="relative w-full flex justify-center">
    <main class="relative w-full flex flex-col items-center gap-6">
        <section class="relative w-full flex flex-col items-center gap-12 pt-[7.5rem] pb-28 md:pt-40 px-6 max-w-3xl">
            <h1 class="text-5xl lg:text-7xl font-bold text-balance text-center">Fulfill all your design-related needs</h1>
            <p class="text-lg text-center">
                Build beautiful and consistent user interfaces with ready-to-use components, a cohesive
                design system and Tailwind's flexibility.
            </p>
            <div class="relative flex justify-center gap-3">
                <a href="/docs/components" class={button()}>
                    Get Started
                </a>
                <a
                    href="https://github.com/sveltique/sveltique"
                    target="_blank"
                    rel="noreferrer"
                    class={button({ variant: "outline" })}
                >
                    View on Github
                </a>
            </div>
        </section>
        <section class="relative w-full flex flex-col items-center gap-12 py-28 px-6 max-w-5xl">
            <h2 class="text-4xl font-bold">Features</h2>
            <p class="text-lg text-center">Everything you need to build beautiful, consistent interfaces.</p>
            <div class="relative w-full flex flex-col items-start gap-12 mx-auto max-lg:max-w-lg lg:flex-row">
                <div class="relative w-full flex flex-col gap-3 items-start">
                    <h3 class="text-2xl font-bold">Ready-to-use</h3>
                    <p class="text-muted-foreground">
                        Covering most UI needs, our ready-to-use components are designed to be dropped
                        in as-is in your project, by including great defaults.
                    </p>
                </div>
                <div class="relative w-full flex flex-col gap-3 items-start">
                    <h3 class="text-2xl font-bold">Cohesive design system</h3>
                    <p class="text-muted-foreground">
                        A small yet cohesive design system that ensures your interface feels unified.
                        Best part ? You can easily extend and adapt it to fit your project.
                    </p>
                </div>
                <div class="relative w-full flex flex-col gap-3 items-start">
                    <h3 class="text-2xl font-bold">Tailwind's flexibility</h3>
                    <p class="text-muted-foreground">
                        Built on top of Tailwind CSS, our components and design system are fully customizable.
                        Tweak colors, rounding, spacing and more without going into the specifics.
                    </p>
                </div>
            </div>
            <a href="/docs/components" class={button()}>
                Get Started
            </a>
        </section>
        <footer class="relative w-full flex flex-col gap-1 items-center justify-center p-6 bg-muted">
            <p class="text-sm text-muted-foreground">Released under the MIT license.</p>
            <p class="text-sm text-muted-foreground">Copyright &copy; 2025 - Present Sajidur Rahman</p>
        </footer>
    </main>
</div>
