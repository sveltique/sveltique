<script>
	import Playground from '$docs/Playground.svelte';
	import Banner from '$lib/components/feedback/banner/Banner.svelte';
	import { replaceEntities } from '$utils/html.js';
	import Badge from '../badge/Badge.svelte';
	import Codeblock from './CodeBlock.svelte';
</script>

<h1>Code Block</h1>
<p>
	Display syntax-highlighted code snippets. It's ideal for documentation, tutorials, or anywhere you
	need clear, readable code examples.
</p>

<h2>Basic Usage</h2>
<p>
	Wrap your code in a <code>&lt;Codeblock&gt;</code> component, set the language and the theme, and you're
	done.
</p>
<Playground>
	<Codeblock
		code={`<div class="card">
    <h2>Hello, world!</h2>
    <p>This is a simple HTML example.</p>
</div>`}
		lang="html"
		theme="catppuccin-latte"
		class="**:font-cascadia-code"
	/>
</Playground>

<h3>Showing Line Numbers</h3>
<p>
	For easier reference, you can show line numbers by adding the
	<Badge>showLineNumbers</Badge> attribute.
</p>
<Playground>
	<Codeblock
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
