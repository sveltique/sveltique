<script>
import { Alert, Button, Link, Tooltip } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const sveltiqueProviderCode = `${script(`import { SveltiqueProvider } from '@sveltique/components/config';
    
    let { children } = $props();`)}

<SveltiqueProvider>
    {@render children()}
</SveltiqueProvider>`;

const importCode = `${script("import { Button, Tooltip } from '@sveltique/components';")}

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
    <meta name="description" content="Learn the basics of using Sveltique components in your project." />
</svelte:head>

<h1 id="usage">Usage</h1>
<p>Learn the basics of using Sveltique components in your project.</p>

<h2 id="quick-start">Quick start</h2>
<p>
    After <Link href="/docs/components/getting-started/installation">installing</Link> and <Link href="/docs/components/getting-started/theming">
        setting up your theme
    </Link>, you can start using Sveltique in your project !
</p>

<h3 id="setup-provider">Setup Provider</h3>
<p>
    Wrap your entire application with the provider. It enables for setting global settings, such as
    animation strategy (more to come later).
</p>
<CodeBlock code={sveltiqueProviderCode} showLineNumbers filename="+layout.svelte" />

<h3>Enjoy</h3>
<p>
    You can start importing 
</p>
<Playground code={importCode}>
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

<h2 id="best-practices">Best practices</h2>
<p>Some best practices when using Sveltique.</p>

<h3 id="theming">Theming</h3>
<p>
    Ideally, your theme should be the single source of truth for customization, to ensure that your
    entire UI feels cohesive and unified.
</p>
<p>
    However, when you inevitably need to make those one-off changes, you can do so. But keep it at a
    minimum to make it easier to maintain and debug in the future.
</p>

<h3 id="extend">Extend</h3>
<p>
    Need to supercharge our components, either because we don't provide what you need or you don't have
    the proper variant ? Simply extend them by wrapping our components !
</p>
<Alert>
    If you think they should be in the core library, consider <Link href="https://github.com/sveltique/sveltique" external>
        suggesting them
    </Link> !
</Alert>
<p>Some advantages are :</p>
<ul>
    <li>Eliminating repetition of the same attributes or variables</li>
    <li>Letting you define better defaults that match your project’s needs</li>
</ul>
<p>
    Certain components, such as the <Link href="/docs/components/browse/code-block#wrapper-component">CodeBlock</Link>,
    promote the wrapper component approach, while others, such as the <Link href="/docs/components/browse/toast#programmatic-calls">
        Toast
    </Link>, help you create new components.
</p>
