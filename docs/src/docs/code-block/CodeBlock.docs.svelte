<script lang="ts">
	import { Alert, Badge, CodeBlock, Link } from '@sveltique/components';
	import { replaceEntities } from '$utils/html.js';
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { highlighter } from '$utils/shiki';
	import { theme } from '$lib/contexts/theme.svelte';
</script>

<h1>Code Block</h1>
<p>
	Display syntax-highlighted code snippets. It's ideal for documentation, tutorials, or anywhere you
	need clear, readable code examples.
</p>
<Alert
	>You must have <Link href="https://shiki.style" external>shiki</Link> installed before using this component.</Alert
>

<h2>Basic Usage</h2>
<p>
	The <code>{'<CodeBlock />'}</code> component highlights the given code synchronously. As such, you
	need to provide a <Badge>highlighter</Badge> object.
</p>
<p>
	You can create one by following the <Link
		href="https://shiki.style/guide/install#highlighter-usage"
		external>"Highlighter Usage"</Link
	> guide from shiki.
</p>

<p>
	Then, wrap your code in a <code>&lt;CodeBlock&gt;</code> component, give it your <Badge
		>highlighter</Badge
	>, set the language and the theme, and you're done.
</p>
<Playground
	code={{
		short: `<CodeBlock
    {code}
    {highlighter}
    lang="svelte"
    theme="catppuccin-latte"
/>`,
		expanded: `${script(`import { CodeBlock } from '@sveltique/components';
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
/>`
	}}
>
	<CodeBlock
		code={`&lt;div class="card"&gt;
    &lt;h2&gt;Hello, world!&lt;/h2&gt;
    &lt;p&gt;This is a simple HTML example.&lt;/p&gt;
&lt;/div&gt;`}
		lang="svelte"
		theme="catppuccin-latte"
		{highlighter}
		class="**:font-cascadia-code"
	/>
</Playground>

<h3>Showing Line Numbers</h3>
<p>
	You can show line numbers with the <Badge>showLineNumbers</Badge> attribute.
</p>
<Playground
	code={{
		short: `<CodeBlock
    {code}
    {highlighter}
    lang="svelte"
    theme="catppuccin-latte"
    showLineNumbers
/>`,
		expanded: `${script(`import { CodeBlock } from '@sveltique/components';

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
/>`
	}}
>
	<CodeBlock
		code={replaceEntities(`&lt;script&gt;
    let a = $state(5);
    let b = $state(7);

    let sum = $derived(a + b);
&lt;/script&gt;

<p>{a} + {b} = {sum}</p>`)}
		lang="svelte"
		theme="catppuccin-latte"
		{highlighter}
		showLineNumbers
		class="**:font-cascadia-code"
	/>
</Playground>

<h3>Highlighting lines</h3>
<p>
	You can highlight certain lines by passing a list of number (starting from one) using the <Badge
		>highlightedLines</Badge
	> attribute.
</p>
<Playground
	code={{
		short: `<CodeBlock
    {code}
    {highlighter}
    lang="svelte"
    theme="catppuccin-latte"
    highlightedLines="2-3,5,8"
/>`,
		expanded: `${script(`import { CodeBlock } from '@sveltique/components';

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
/>`
	}}
>
	<CodeBlock
		code={replaceEntities(`${script(`let a = $state(5);
    let b = $state(7);

    let sum = $derived(a + b);`)}

<p>{a} + {b} = {sum}</p>`)}
		lang="svelte"
		theme="catppuccin-latte"
		{highlighter}
		highlightedLines="2-3,5,8"
		class="data-[code-block]:**:font-cascadia-code"
	/>
</Playground>

<h2>Wrapper component</h2>
<p>
	The <code>{'<CodeBlock />'}</code> component, while useful on its own, requires you to pass the highlighter
	every time. However, it can get repetitive pretty quickly, so we recommend that you make your own wrapper
	component.
</p>
<p>
	It has the advantage to let you skip passing the highlighter every time, set the same theme for
	evey code block or add your own logic (light/dark for example), setting the font and more.
</p>

<h3>Implementation Example</h3>
<p>
	Here is an implementation example with some added defaults. Feel free to adapt it to your needs.
</p>
<ul>
	<li>
		<p><Badge>highlighter</Badge> is passed automatically</p>
	</li>
	<li>
		<p>Theme is based on light/dark mode</p>
	</li>
	<li>
		<p>Use <Link href="https://github.com/microsoft/cascadia-code">Cascadia Code</Link></p>
	</li>
	<li>
		<p>Always show line numbers</p>
	</li>
</ul>

<CodeBlock
	code={`${script(`import { CodeBlock, type CodeBlockProps } from "@sveltique/components";
    import { highlighter } from "path/to/highlighter";
    import { theme } from "path/to/theme";

    type Props = Omit<CodeBlockProps, "highlighter" | "showLineNumbers" | "theme">;

    let { class: className, lang = "svelte", ...restProps }: Props = $props();`)}

<CodeBlock
    {highlighter}
    {lang}
    theme={theme.isDark ? "one-dark-pro" : "catppuccin-latte"}
    class={[className, "**:font-cascadia-code"]}
    showLineNumbers
    {...restProps}
/>`}
	{highlighter}
	lang="svelte"
	theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
	class="**:font-cascadia-code"
	showLineNumbers
/>

<h3>Usage</h3>
<CodeBlock
	code={'<CodeBlock code="<p>My own CodeBlock wrapper !</p>" />'}
	{highlighter}
	lang="svelte"
	theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
	class="**:font-cascadia-code"
	showLineNumbers
/>
