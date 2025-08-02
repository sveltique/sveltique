<script lang="ts">
	import Playground from '$docs/Playground.svelte';
	import TextInput from '../text-input/TextInput.svelte';
	import Field from './Field.svelte';

	let label = $state('Full Name');
	let type = $state<'text' | 'number'>('text');
</script>

<h1>Field</h1>
<p>Text fields allow users to enter text into a UI.</p>
<h2>Basic Usage</h2>
<p>The field is a text field, and includes a label and an error message when provided.</p>
<Playground>
	<Field {label} fullWidth={false} class="max-w-[200px]">
		{#snippet input(props)}
			<TextInput {...props} />
		{/snippet}
	</Field>

	{#snippet controls()}
		<Field label="Label" />
		<select bind:value={type}>
			<option>text</option>
			<option>number</option>
		</select>
	{/snippet}
</Playground>
