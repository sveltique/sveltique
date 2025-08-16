<script lang="ts">
	import { numberInput } from './variants.js';
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
	const { container, input, decrement, increment, icon } = $derived(numberInput());

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
		{@render minusIcon()}
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
		{@render plusIcon()}
	</button>
</div>

{#snippet minusIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="icon icon-tabler icons-tabler-outline icon-tabler-minus {icon()}"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M5 12l14 0" />
	</svg>
{/snippet}

{#snippet plusIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="icon icon-tabler icons-tabler-outline icon-tabler-plus {icon()}"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 5l0 14" />
		<path d="M5 12l14 0" />
	</svg>
{/snippet}

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
