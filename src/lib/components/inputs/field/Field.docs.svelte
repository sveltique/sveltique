<script lang="ts">
	import Playground from '$docs/Playground.svelte';
	import { toTitleCase } from '$utils/string.js';
	import { Select } from '../index.js';
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
		<Field label="Input type">
			{#snippet input(props)}
				<Select.Root {...props} containerClass="w-[200px]">
					{#each ['text', 'number', 'select'] as type}
						<Select.Option value={type}>{toTitleCase(type)}</Select.Option>
					{/each}
				</Select.Root>
			{/snippet}
		</Field>
	{/snippet}
</Playground>
