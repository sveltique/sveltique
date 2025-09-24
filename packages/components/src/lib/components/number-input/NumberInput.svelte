<script lang="ts">
import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type NumberInputVariants, numberInput } from "./variants.js";

export interface NumberInputProps
	extends ReplaceWithTWMergeClass<Omit<HTMLInputAttributes, "step" | "min" | "max" | "value">>,
		WithRef<HTMLDivElement>,
		NumberInputVariants {
	/**
	 * Additional classes to add to the element.
	 * @deprecated Use `containerProps` instead.
	 * @default —
	 */
	containerClass?: string | undefined;
	/**
	 * Additional properties to customize the root container.
	 * @default {}
	 */
	containerProps?: ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>;
	/**
	 * The value of the input.
	 * @bindable
	 * @default null
	 */
	value?: number | null;
	/**
	 * The granularity that the value must adhere to.
	 * @default 1
	 */
	step?: number | undefined;
	/**
	 * The minimum value of the input.
	 * @default —
	 */
	min?: number | undefined;
	/**
	 * The maxium value of the input.
	 * @default —
	 */
	max?: number | undefined;
}

let {
	id,
	class: className,
	containerClass: __DEPRECATED_containerClass,
	containerProps = {},
	max,
	min,
	ref = $bindable(),
	step = 1,
	value = $bindable(),
	...restProps
}: NumberInputProps = $props();

let inputRef = $state<HTMLInputElement>();

let { class: containerClass, ...restContainerProps } = $derived(containerProps);
const { container, input, decrement, increment, icon } = $derived(numberInput());

function changeValue(v: string | number) {
	if (!isNumber(v)) {
		value = null;
		inputRef!.value = "";
		return;
	}

	const newValue = Number(v);

	if (min !== undefined && newValue < min) {
		value = min;
		inputRef!.value = min.toString();
	} else if (max !== undefined && newValue > max) {
		value = max;
		inputRef!.value = max.toString();
	} else {
		value = newValue;
		inputRef!.value = newValue.toString();
	}
}

function isNumber(value: unknown) {
	return value !== null && value !== "" && !isNaN(Number(String(value)));
}
</script>

<!--
@component
An enhanced input for working with numbers. It includes increment/decrement controls and enforces `min` and `max` constraints out of the box.
@see https://sveltique.dev/docs/components/browse/number-input
-->

<div
    bind:this={ref}
    data-number-input
    class={container({ class: [__DEPRECATED_containerClass, containerClass] })}
    {...restContainerProps}
>
	<button onclick={() => changeValue((value ?? 0) - step)} class={decrement()}>
		{@render minusIcon()}
	</button>
	<input
		bind:this={inputRef}
		{id}
		{min}
		{max}
		{step}
        {value}
		onchange={(event) => changeValue(event.currentTarget.value)}
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
