<script lang="ts">
	import Playground from '$docs/Playground.svelte';
	import NumberInput from './NumberInput.svelte';

	let value = $state(50);
	let step = $state(1);
	let min = $state(0);
	let max = $state(100);
</script>

<h1>Separator</h1>
<p>Text NumberInputs allow users to enter text into a UI.</p>
<h2>Basic Usage</h2>
<p>
	The NumberInput is a text NumberInput, and includes a label and an error message when provided.
</p>
<Playground>
	<NumberInput bind:value {step} {min} {max} />

	{#snippet controls()}
		<NumberInput />
	{/snippet}
</Playground>
