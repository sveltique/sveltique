<script lang="ts">
	import { replaceEntities } from '$utils/html.js';
	import { Badge, CodeBlock } from '@novaotp/components';
	import Playground from '$components/Playground.svelte';
	import { codeToHtml } from 'shiki';
</script>

<h1>Code Block</h1>
<p>
	Display syntax-highlighted code snippets. It's ideal for documentation, tutorials, or anywhere you
	need clear, readable code examples.
</p>

{@html await codeToHtml(
	`<div class="card">;
    <h2>Hello, world!</h2>;
    <p>This is a simple HTML example.</p>
</div>`,
	{ lang: 'svelte', theme: 'catppuccin-latte' }
)}

<h2>Basic Usage</h2>
<p>
	Wrap your code in a <code>&lt;CodeBlock&gt;</code> component, set the language and the theme, and you're
	done.
</p>
<Playground>
	<CodeBlock
		code={`&lt;div class="card"&gt;
    &lt;h2&gt;Hello, world!&lt;/h2&gt;
    &lt;p&gt;This is a simple HTML example.&lt;/p&gt;
&lt;/div&gt;`}
		lang="html"
		theme="catppuccin-latte"
		class="**:font-cascadia-code"
	/>
</Playground>

<h3>Showing Line Numbers</h3>
<p>
	You can show line numbers with the <Badge>showLineNumbers</Badge> attribute.
</p>
<Playground>
	<CodeBlock
		code={replaceEntities(`&lt;script&gt;
    let a = $state(5);
    let b = $state(7);
    let sum = $derived(a + b);
&lt;/script&gt;

<p>{a} + {b} = {sum}</p>`)}
		lang="svelte"
		theme="catppuccin-latte"
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
<Playground>
	<CodeBlock
		code={replaceEntities(`&lt;script&gt;
    let a = $state(5);
    let b = $state(7);
    let sum = $derived(a + b);
&lt;/script&gt;

<p>{a} + {b} = {sum}</p>`)}
		lang="svelte"
		theme="catppuccin-latte"
		showLineNumbers
		highlightedLines={[4]}
		class="**:font-cascadia-code"
	/>
</Playground>
