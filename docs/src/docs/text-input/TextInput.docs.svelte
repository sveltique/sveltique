<script>
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Badge, TextInput } from '@sveltique/components';
</script>

<h1>Text Input</h1>
<p>Used for short, single-line text.</p>

<h2>Basic Usage</h2>
<p>Use it as a drop-in replacement for input <Badge>type="text"</Badge>.</p>
<Playground
	code={{
		short: '<TextInput />',
		expanded: `${script('import { TextInput } from "@sveltique/components";')}
    
<TextInput />`
	}}
>
	<TextInput />
</Playground>
