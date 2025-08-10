<script lang="ts">
	import { numberInput } from './variants.js';
	import IconMinus from '@tabler/icons-svelte/icons/minus';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends Omit<HTMLInputAttributes, 'class' | 'step' | 'min' | 'max' | 'value'> {
		containerClass?: string | undefined;
		class?: ClassNameValue;
		value?: number | null;
		/** @default 1 */
		step?: number | undefined;
		min?: number | undefined;
		max?: number | undefined;
	}

	let {
		id,
		containerClass,
		class: className,
		value = $bindable(),
		step = 1,
		min,
		max,
		...restProps
	}: Props = $props();

	let ref = $state<HTMLInputElement>();
	const { container, input, decrement, increment } = $derived(numberInput());

	$inspect(value);

	$effect(() => {
		ref!.value = value?.toString() ?? '';
	});

	function changeValue(v: string | number) {
		if (!isNumber(v)) {
			value = null;
			ref!.value = '';
			return;
		}

		const newValue = Number(v);

		if (min !== undefined && newValue < min) {
			value = min;
		} else if (max !== undefined && newValue > max) {
			value = max;
		} else {
			value = newValue;
		}
	}

	function isNumber(value: unknown) {
		return value !== null && value !== '' && !isNaN(Number(String(value)));
	}
</script>

<!--
@component
An input for numbers.

Comes with increment/decrement buttons and built-in `min` and `max` validation.
-->

<div class={container({ class: containerClass })}>
	<button onclick={() => changeValue((value ?? 0) - step)} class={decrement()}>
		<IconMinus class="size-4" />
	</button>
	<input
		bind:this={ref}
		{id}
		{min}
		{max}
		{step}
		oninput={(event) => changeValue(event.currentTarget.value)}
		type="text"
		inputmode="numeric"
		pattern="[0-9]*"
		class={input({ className })}
		{...restProps}
	/>
	<button onclick={() => changeValue((value ?? 0) + step)} class={increment()}>
		<IconPlus class="size-4" />
	</button>
</div>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
