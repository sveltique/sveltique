<script lang="ts">
import { Badge, Paper } from "@sveltique/components";

const corePrinciples = [
	{
		title: "Built on Web standards",
		description: "We always reach out to existing standards before making our own version."
	},
	{
		title: "Customizable",
		description: "Easy to style or extend with your own variants and utilities."
	},
	{
		title: "Accessible by default",
		description: "Every component follows WAI-ARIA and keyboard interaction standards."
	}
];
</script>

<h1 id="overview">Overview</h1>
<p>Accessible and customizable UI components for Svelte.</p>

<h2 id="what-is-sveltique">What is Sveltique</h2>
<p>
    Sveltique is a component library for Svelte designed to make building accessible interfaces effortless.
    Every component ships with sensible defaults, keyboard and screen reader support, and full customization
    when you need it.
</p>
<p>
    Whether you're prototyping quickly or maintaining a large-scale app, Sveltique helps you stay consistent
    and accessible without extra boilerplate.
</p>

<h2 id="core-principles">Core principles</h2>
<ul class="pl-0! list-none! gap-3! grid! sm:grid-cols-2" style="grid-auto-rows: 1fr;">
    {#each corePrinciples as { title, description }, index (index)}
        {@const id = `principle-${index}`}
        <li class="contents">
            <Paper role="article" aria-labelledby={id} class="p-6 space-y-3">
                <h3 {id} data-no-sidebar class="text-lg font-bold">{title}</h3>
                <p class="text-sm">{description}</p>
            </Paper>
        </li>
    {/each}
</ul>

<h2 id="key-features">Key features</h2>
<ul>
    <li>Theming through Tailwind CSS</li>
    <li>Motion-safe animations</li>
    <li>Type-safe, ergonomic APIs</li>
    <li>Ready for Svelte and SvelteKit projects</li>
</ul>

<h2 id="design-goals">Design goals</h2>
<p>
    Sveltique draws inspiration from libraries like <Badge>Radix UI</Badge>, <Badge>shadcn</Badge>,
    and <Badge>Flowbite</Badge>. It aims to provide the same level of robustness and accessibility while
    keeping the developer experience simple and declarative.
</p>
