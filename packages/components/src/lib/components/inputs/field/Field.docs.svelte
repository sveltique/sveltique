<script lang="ts">
	import Playground from '$docs/Playground.svelte';
	import { toTitleCase } from '$utils/string.js';
	import { Select } from '../index.js';
	import NumberInput from '../number-input/NumberInput.svelte';
	import TextInput from '../text-input/TextInput.svelte';
	import { ageCode } from './content.js';
	import Field from './Field.svelte';

	type Input = 'text' | 'number' | 'select';

	let type = $state<Input>('text');
	let age = $state(18);
	let ageError = $derived.by(() => {
		if (age < 16 || age > 25) {
			return 'You must be between 16 and 25 years old to participate.';
		}
	});
</script>

<h1>Field</h1>
<p>Text fields allow users to enter text into a UI.</p>
<h2>Basic Usage</h2>
<p>
	A field is composable, including a label and an error message when provided. It accepts any input
	element, or custom ones such as <a href="/docs/components/inputs/text-input">{'<TextInput />'}</a
	>, <a href="/docs/components/inputs/number-input">{'<NumberInput />'}</a> or
	<a href="/docs/components/inputs/select">{'<Select />'}</a>.
</p>
<Playground>
	{#if type === 'text'}
		{@render textInput()}
	{:else if type === 'number'}
		{@render numberInput()}
	{:else if type === 'select'}
		{@render selectInput()}
	{/if}

	{#snippet controls()}
		<Field label="Input type">
			{#snippet input(props)}
				<Select.Root bind:value={type} containerClass="w-[200px]" {...props}>
					{#each ['text', 'number', 'select'] as t (t)}
						<Select.Option value={t}>{toTitleCase(t)}</Select.Option>
					{/each}
				</Select.Root>
			{/snippet}
		</Field>
	{/snippet}
</Playground>
<h2>Error</h2>
<p>You can show an error message under the field by setting the error property.</p>
<p class="text-sm text-zinc-500 italic">Tip : Try setting the age under 16 or above 25.</p>
<Playground code={ageCode}>
	<Field label="Age" error={ageError} class="w-[240px]">
		{#snippet input(props)}
			<NumberInput bind:value={age} min={0} max={99} {...props} />
		{/snippet}
	</Field>
</Playground>

{#snippet textInput()}
	<Field label="Full Name" class="w-[200px]">
		{#snippet input(props)}
			<TextInput {...props} />
		{/snippet}
	</Field>
{/snippet}

{#snippet numberInput()}
	<Field label="Age" class="w-[160px]">
		{#snippet input(props)}
			<NumberInput value={18} min={0} max={99} {...props} />
		{/snippet}
	</Field>
{/snippet}

{#snippet selectInput()}
	<Field label="Fruit">
		{#snippet input(props)}
			<Select.Root {...props}>
				<Select.Option value="" selected disabled>Choose a fruit</Select.Option>
				{#each ['apple', 'banana', 'kiwi', 'mango'] as fruit}
					<Select.Option value={fruit}>{toTitleCase(fruit)}</Select.Option>
				{/each}
			</Select.Root>
		{/snippet}
	</Field>
{/snippet}
