<script>
import { Alert, Button, Link, Tooltip } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const code = `${script("import { Button, Tooltip } from '@sveltique/components';")}

<Tooltip title="Sveltique is awesome">
    {#snippet children({ props, ref })}
        <Button bind:ref={ref.current} {...props}>
            Hover me !
        </Button>
    {/snippet}
</Tooltip>`;
</script>

<svelte:head>
    <title>Usage - sveltique/components</title>
    <meta name="description" content="Learn the basics of Sveltique components to use them in your project." />
</svelte:head>

<h1 id="usage">Usage</h1>
<p>Learn the basics of Sveltique components to use them in your project.</p>

<h2 id="quick-start">Quick start</h2>
<p>
    After <Link href="/docs/components/getting-started/installation">installing</Link> and
    <Link href="/docs/components/getting-started/theming">setting up your theme</Link>, you can finally
    start importing Sveltique components in your project !
</p>
<Playground {code}>
    <Tooltip title="Sveltique is awesome">
        {#snippet children({ props, ref })}
            <Button bind:ref={ref.current} {...props}>Hover me !</Button>
        {/snippet}
    </Tooltip>
</Playground>

<h2 id="tree-shaking">Tree shaking</h2>
<p>
    To reduce your bundle, you can import each component individually instead of using the root
    import.
</p>
<Alert class="mb-4">
    To keep the imports brief in the code examples, we will use the root import but it is not recommended
    in production. Though, the more components you use, the less it will impact you.
</Alert>
<CodeBlock code={'import { Alert } from "@sveltique/components/alert";'} lang="ts" />

<h2>Best practices</h2>
<p>Some best practices when using Sveltique.</p>

<h3>Theming</h3>
<p>
    Ideally, your theme should be the single source of truth for customization, to ensure that your
    entire UI feels cohesive and unified.
</p>
<p>
    However, when you inevitably need to make those one-off changes, you can do so. But keep it at a
    minimum to make it easier to maintain and debug in the future.
</p>

<h3>Extend</h3>
<p>
    Need to supercharge our components, either because we don't provide what you need or you don't have the proper variant ? Simply extend them by wrapping our components !
</p>
<p>Some advantages are :</p>
<ul>
    <li>Eliminating repetition of the same attributes or variables</li>
    <li>Letting you define better defaults that match your project’s needs</li>
</ul>
<Alert>
    If you think they should be in the core library, consider <Link href="https://github.com/sveltique/sveltique" external>
        suggesting them
    </Link> !
</Alert>
