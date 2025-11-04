<script module lang="ts">
type OnChangeEvent = Event & {
	currentTarget: EventTarget & HTMLInputElement;
};

type HTMLRadioAttributes = HTMLInputAttributes & TWMergeClass;
type HTMLRadioRef = WithRef<HTMLInputElement>;
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { type RadioGroupItemVariants, radioGroup } from "../variants.js";
import { getLocalContext } from "../context.svelte.js";

export interface RadioGroupProps extends HTMLRadioAttributes, HTMLRadioRef, RadioGroupItemVariants {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/**
	 * The type of the input.
	 * @default "radio"
	 */
	type?: "radio";
	/** The value of this radio item. */
	value: string;
}

let {
	children,
	class: className,
    onchange,
	ref = $bindable(),
	value,
	...restProps
}: RadioGroupProps = $props();

const context = getLocalContext();

function onChange(event: OnChangeEvent) {
    context.value = value;
    onchange?.(event)
} 
</script>

<input
    bind:this={ref}
    onchange={onChange}
    type="radio"
    name={context.name}
    data-radio-group-item
    class={radioGroup.item({ className })}
    {...restProps}
/>
