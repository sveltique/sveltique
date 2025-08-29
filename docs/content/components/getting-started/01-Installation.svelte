<script>
import { Badge, Link } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
</script>

<svelte:head>
    <title>Installation - sveltique/components</title>
    <meta name="description" content="Install Sveltique components library." />
</svelte:head>

<h1 id="installation" class="text-3xl font-bold">Installation</h1>
<p>Install Sveltique components library.</p>

<h2 id="default-installation">Default installation</h2>
<p>You can easily import the library via npm.</p>
<CodeBlock code="npm install @sveltique/components" lang="bash" />

<h3 id="peer-dependencies">Peer dependencies</h3>
<p>Note that you should at least have Svelte at version 5.25.0 to use the library.</p>
<CodeBlock
    code={`"peerDependencies": {
    "svelte": "^5.25.0"
}`}
    lang="json"
/>

<h3 id="optional-dependencies">Optional dependencies</h3>
<p>These libraries are optional if you don't use the components that rely on them.</p>

<h4 id="code-block">Code Block</h4>
<p>
    The <code>{"<CodeBlock />"}</code> component uses <Link href="https://shiki.style" external
        >shiki</Link
    > under the hood to provide syntax highlighting.
</p>
<CodeBlock code="npm install shiki" lang="bash" />

<h2 id="setting-up-your-theme">Setting up your theme</h2>
<p>
    Define your theme in <Badge>theme.css</Badge> (you will learn more about theming later).
</p>
<CodeBlock
    code={`@custom-variant dark (&:where(.dark, .dark *));

@theme {
    /* Fonts */
    --font-codeblock: 'Cascadia Code', sans-serif; /* Ensure you have imported the font before */

    /* Generic colors */
    --color-black: #000;
    --color-white: #fff;

    /* Background color */
    --color-background: var(--background);
    --color-foreground: var(--foreground);

    /* Primary color */
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);

    /* Accent colors */
    --color-info: var(--info);
    --color-success: var(--success);
    --color-warning: var(--warning);
    --color-danger: var(--danger);

    /* DERIVED COLORS, SHOULD NOT BE MODIFIED */
    --color-muted: color-mix(in oklch, var(--background), var(--foreground) 10%);
    --color-muted-foreground: color-mix(in oklch, var(--background), var(--foreground) 50%);

    --color-primary-muted: color-mix(in oklch, var(--primary), var(--background) 10%);
    --color-primary-disabled: color-mix(in oklch, var(--primary), var(--background) 50%);

    --color-info-light: color-mix(in oklch, var(--info), var(--background) 90%);
    --color-success-light: color-mix(in oklch, var(--success), var(--background) 90%);
    --color-warning-light: color-mix(in oklch, var(--warning), var(--background) 90%);
    --color-danger-light: color-mix(in oklch, var(--danger), var(--background) 90%);
    --color-danger-muted: color-mix(in oklch, var(--danger), var(--background) 10%);
}

:root {
    /* Background color */
    --background: white;
    --foreground: oklch(20.5% 0 0);

    /* Primary color */
    --primary: oklch(48.8% 0.243 264.376);
    --primary-foreground: white;

    /* Accent colors */
    --info: oklch(62.3% 0.214 259.815);
    --success: oklch(72.3% 0.219 149.579);
    --warning: oklch(79.5% 0.184 86.047);
    --danger: oklch(63.7% 0.237 25.331);

    @variant dark {
        /* Background color */
        --background: oklch(20.5% 0 0);
        --foreground: white;

        /* Primary color */
        --primary: oklch(82.8% 0.111 230.318);
        --primary-foreground: oklch(20.5% 0 0);

        /* Accent colors */
        --info: oklch(62.3% 0.214 259.815);
        --success: oklch(72.3% 0.219 149.579);
        --warning: oklch(79.5% 0.184 86.047);
        --danger: oklch(63.7% 0.237 25.331);
    }
}`}
    filename="theme.css"
    lang="css"
    showLineNumbers
/>

<p>Then, you can import both Sveltique's source files and your theme in your main css file.</p>
<CodeBlock
    code={`/* Replace with your codeblock font */
@import url('https://fonts.cdnfonts.com/css/cascadia-code');

@import 'tailwindcss';
@plugin '@tailwindcss/forms';

@source "../node_modules/@sveltique/components";
@import './theme.css';

/* Rest of your custom css here... */`}
    filename="app.css"
    lang="css"
    showLineNumbers
/>
