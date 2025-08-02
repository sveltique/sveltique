<script lang="ts">
	import { numberInput } from './variants.js';
	import IconMinus from '@tabler/icons-svelte/icons/minus';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends Omit<HTMLInputAttributes, 'class' | 'step' | 'min' | 'max' | 'value'> {
		containerClass?: string | undefined;
		class?: ClassNameValue;
		/** @default 0 */
		value?: number;
		step?: number | undefined;
		min?: number | undefined;
		max?: number | undefined;
	}

	let {
		id,
		containerClass,
		class: className,
		value = $bindable(0),
		step = 1,
		min,
		max,
		...restProps
	}: Props = $props();

	const { container, input, decrement, increment } = $derived(numberInput());
</script>

<div class={container({ class: containerClass })}>
	<button onclick={() => (value -= step)} class={decrement()}>
		<IconMinus class="size-4" />
	</button>
	<input
		bind:value
		type="text"
		inputmode="numeric"
		pattern="[0-9]*"
		{id}
		{step}
		{min}
		{max}
		class={input({ className })}
		{...restProps}
	/>
	<button onclick={() => (value += step)} class={increment()}>
		<IconPlus class="size-4" />
	</button>
</div>
