<script module>
export const metadata = {
	description:
		"Display syntax-highlighted code snippets. Ideal anywhere you need clear, readable code examples."
};
</script>

<script lang="ts">
import { Alert, Badge, CodeBlock, Link } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { theme } from "$lib/contexts/theme.svelte";
import { replaceEntities } from "$utils/html.js";
import { script } from "$utils/playground";
import { highlighter } from "$utils/shiki";

const basicUsageCode = `${script(`import { CodeBlock } from '@sveltique/components';
    import { highlighter } from '$utils/my-highlighter';

    const code = \`&lt;div class="card"&gt;
    &lt;h2&gt;Hello, world!&lt;/h2&gt;
    &lt;p&gt;This is a simple HTML example.&lt;/p&gt;
&lt;/div&gt;\`;`)}

<CodeBlock
    {code}
    {highlighter}
    lang="svelte"
    theme="catppuccin-latte"
/>`;

const showLineNumbersCode = `${script(`import { CodeBlock } from '@sveltique/components';

    const code = \`&lt;script&gt;
    let a = $state(5);
    let b = $state(7);

    let sum = $derived(a + b);
&lt;/script&gt;

<p>{a} + {b} = {sum}</p>\`;`)}

<CodeBlock
    {code}
    {highlighter}
    lang="svelte"
    theme="catppuccin-latte"
    showLineNumbers
/>`;

const highlightingLinesCode = `${script(`import { CodeBlock } from '@sveltique/components';

    const code = \`&lt;script&gt;
    let a = $state(5);
    let b = $state(7);

    let sum = $derived(a + b);
&lt;/script&gt;

<p>{a} + {b} = {sum}</p>\`;`)}

<CodeBlock
    {code}
    {highlighter}
    lang="svelte"
    theme="catppuccin-latte"
    highlightedLines="2-3,5,8"
/>`;

const filenameCode = `${script(`import { CodeBlock } from '@sveltique/components';

    const code = \`&lt;script&gt;
    let counter = $state(0);
&lt;/script&gt;

<p>{counter}</p>
<button onclick={() => counter++}>increment</button>\`;`)}

<CodeBlock
    {code}
    filename="Counter.svelte"
    lang="svelte"
    theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
    {highlighter}
/>`;

const iconCode = `${script(`import { CodeBlock } from '@sveltique/components';

    const code = \`&lt;script&gt;
    let counter = $state(0);
&lt;/script&gt;

<p>{counter}</p>
<button onclick={() => counter++}>increment</button>\`;`)}

<CodeBlock
	{code}
    filename="Counter.svelte"
    lang="svelte"
    theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
    {highlighter}
>
    {#snippet icon()}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-svelte text-muted-foreground"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M15 8l-5 3l.821 -.495c1.86 -1.15 4.412 -.49 5.574 1.352a3.91 3.91 0 0 1 -1.264 5.42l-5.053 3.126c-1.86 1.151 -4.312 .591 -5.474 -1.251a3.91 3.91 0 0 1 1.263 -5.42l.26 -.16" />
            <path d="M8 17l5 -3l-.822 .496c-1.86 1.151 -4.411 .491 -5.574 -1.351a3.91 3.91 0 0 1 1.264 -5.42l5.054 -3.127c1.86 -1.15 4.311 -.59 5.474 1.252a3.91 3.91 0 0 1 -1.264 5.42l-.26 .16" />
        </svg>
    {/snippet}
</CodeBlock>`

const implementationCode = `${script(`import { CodeBlock, type CodeBlockProps } from "@sveltique/components";

    // Adapt these imports
    import { highlighter } from "path/to/highlighter";
    import { theme } from "path/to/theme";

    interface Props extends Omit<CodeBlockProps, 'highlighter' | 'lang' | 'theme'> {
        /** @default 'svelte' */
        lang?: CodeBlockProps['lang'];
    }

    let { lang = "svelte", ...restProps }: Props = $props();`)}

<CodeBlock
    {highlighter}
    {lang}
    theme={theme.isDark ? "one-dark-pro" : "catppuccin-latte"}
    {...restProps}
/>`;
</script>

<h1 id="code-block">Code Block</h1>
<p>
	Display syntax-highlighted code snippets. Ideal anywhere you need clear, readable code examples
	(like on this website !).
</p>
<Alert
	>You must have <Link href="https://shiki.style" external>shiki</Link> installed to use this component.</Alert
>

<h2 id="basic-usage">Basic Usage</h2>
<p>
	The <code>{'<CodeBlock />'}</code> component highlights the given code synchronously. As such, you
	need to provide a <Badge>highlighter</Badge> object.
</p>
<p>
	You can create one by following the <Link
		href="https://shiki.style/guide/install#highlighter-usage"
		external>"Highlighter Usage" guide</Link
	> from shiki.
</p>

<p>
	Then, wrap your code in a <code>&lt;CodeBlock&gt;</code> component, give it your <Badge
		>highlighter</Badge
	>, set the language and the theme, and you're done.
</p>
<Playground code={basicUsageCode}>
	<CodeBlock
		code={`&lt;div class="card"&gt;
    &lt;h2&gt;Hello, world!&lt;/h2&gt;
    &lt;p&gt;This is a simple HTML example.&lt;/p&gt;
&lt;/div&gt;`}
		lang="svelte"
		theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
		{highlighter}
	/>
</Playground>

<h3 id="showing-line-numbers">Showing Line Numbers</h3>
<p>
	You can show line numbers with the <Badge>showLineNumbers</Badge> attribute.
</p>
<Playground code={showLineNumbersCode}>
	<CodeBlock
		code={replaceEntities(`&lt;script&gt;
    let a = $state(5);
    let b = $state(7);

    let sum = $derived(a + b);
&lt;/script&gt;

<p>{a} + {b} = {sum}</p>`)}
		lang="svelte"
		theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
		{highlighter}
		showLineNumbers
	/>
</Playground>

<h3 id="highlighting-lines">Highlighting lines</h3>
<p>
	You can highlight certain lines by passing a list of number (starting from one) using the <Badge
		>highlightedLines</Badge
	> attribute.
</p>
<p>Syntax :</p>
<ul>
	<li><p>Use numbers for one-line highlighting (e.g. "1")</p></li>
	<li><p>Create ranges with hyphens (e.g. "2-5")</p></li>
	<li><p>Combine numbers and/or ranges using commas (e.g. "1,2-5,9")</p></li>
</ul>

<Playground code={highlightingLinesCode}>
	<CodeBlock
		code={`${script(`let a = $state(5);
    let b = $state(7);

    let sum = $derived(a + b);`)}

<p>{a} + {b} = {sum}</p>`}
		lang="svelte"
		theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
		{highlighter}
		highlightedLines="2-3,5,8"
	/>
</Playground>

<h3 id="filename">Filename</h3>
<p>You can add a filename via the <Badge>filename</Badge> attribute.</p>
<Playground code={filenameCode}>
	<CodeBlock
		code={`${script(`let counter = $state(0);`)}

<p>{counter}</p>
<button onclick={() => counter++}>increment</button>`}
		filename="Counter.svelte"
		lang="svelte"
		theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
		{highlighter}
	/>
</Playground>

<h3 id="icon">Icon</h3>
<p>You can add an icon via the <Badge>icon</Badge> snippet.</p>
<Alert class="mb-4">Note that you must have a filename for the icon to render.</Alert>
<Playground code={iconCode}>
	<CodeBlock
		code={`${script(`let counter = $state(0);`)}

<p>{counter}</p>
<button onclick={() => counter++}>increment</button>`}
		filename="Counter.svelte"
		lang="svelte"
		theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
		{highlighter}
	>
        {#snippet icon()}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-brand-svelte text-muted-foreground"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 8l-5 3l.821 -.495c1.86 -1.15 4.412 -.49 5.574 1.352a3.91 3.91 0 0 1 -1.264 5.42l-5.053 3.126c-1.86 1.151 -4.312 .591 -5.474 -1.251a3.91 3.91 0 0 1 1.263 -5.42l.26 -.16" />
                <path d="M8 17l5 -3l-.822 .496c-1.86 1.151 -4.411 .491 -5.574 -1.351a3.91 3.91 0 0 1 1.264 -5.42l5.054 -3.127c1.86 -1.15 4.311 -.59 5.474 1.252a3.91 3.91 0 0 1 -1.264 5.42l-.26 .16" />
            </svg>
        {/snippet}
    </CodeBlock>
</Playground>

<h2 id="wrapper-component">Wrapper component</h2>
<p>
	The <code>{'<CodeBlock />'}</code> component, while useful on its own, requires you to pass many
	parameters (such as the <Badge>highlighter</Badge> and theme) every time.
</p>
<p>
	However, if you often use the same values/defaults, it can get repetitive pretty quickly, so we
	recommend that you make your own wrapper component.
</p>
<p>
	It has the advantage to let you skip passing the highlighter every time, set the same theme for
	evey code block or add your own logic (light/dark for example), setting fonts and more.
</p>

<h3 id="implementation-example">Implementation Example</h3>
<p>
	Here is an implementation example with some added defaults. Feel free to adapt it to your needs :
</p>
<ul>
	<li>
		<p><Badge>highlighter</Badge> is passed automatically</p>
	</li>
	<li>
		<p>Theme is based on light/dark mode</p>
	</li>
	<li>
		<p>Default language is <Badge>svelte</Badge></p>
	</li>
</ul>

<CodeBlock
	code={implementationCode}
	{highlighter}
	lang="svelte"
	theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
	showLineNumbers
/>

<h3 id="usage">Usage</h3>
<CodeBlock
	code={'<CodeBlock code="<p>My own CodeBlock wrapper with defaults!</p>" />'}
	{highlighter}
	lang="svelte"
	theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
	showLineNumbers
/>
