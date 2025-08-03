<script lang="ts">
	import Playground from '$docs/Playground.svelte';
	import { toTitleCase } from '$utils/string.js';
	import { Select } from '../index.js';
	import NumberInput from '../number-input/NumberInput.svelte';
	import TextInput from '../text-input/TextInput.svelte';
	import Field from './Field.svelte';

	type Input = 'text' | 'number' | 'select';

	let type = $state<Input>('text');
</script>

<h1>Field</h1>
<p>Text fields allow users to enter text into a UI.</p>
<h2>Basic Usage</h2>
<p>The field is a text field, and includes a label and an error message when provided.</p>
<Playground>
	{#if type === 'text'}
		<Field label="Full Name" fullWidth={false} class="w-[200px]">
			{#snippet input(props)}
				<TextInput {...props} />
			{/snippet}
		</Field>
	{:else if type === 'number'}
		<Field label="Age" fullWidth={false} class="max-w-[200px]">
			{#snippet input(props)}
				<NumberInput {...props} value={18} min={0} max={99} />
			{/snippet}
		</Field>
	{:else if type === 'select'}
		<Field label="Fruit" fullWidth={false} class="max-w-[200px]">
			{#snippet input(props)}
				<Select.Root {...props}>
					{#each ['apple', 'banana', 'kiwi', 'mango'] as fruit}
						<Select.Option value={fruit}>{toTitleCase(fruit)}</Select.Option>
					{/each}
				</Select.Root>
			{/snippet}
		</Field>
	{/if}

	{#snippet controls()}
		<Field label="Input type">
			{#snippet input(props)}
				<Select.Root {...props} bind:value={type} containerClass="w-[200px]">
					{#each ['text', 'number', 'select'] as t (t)}
						<Select.Option value={t}>{toTitleCase(t)}</Select.Option>
					{/each}
				</Select.Root>
			{/snippet}
		</Field>
	{/snippet}
</Playground>
