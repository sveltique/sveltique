<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type TextInputVariants, textInput } from "./variants.js";

export interface TextInputProps
	extends ReplaceWithTWMergeClass<Omit<HTMLInputAttributes, "value">>,
		WithRef<HTMLInputElement>,
		TextInputVariants {
	/**
	 * The value of the text input.
	 * @bindable
	 * @default ""
	 */
	value?: string;
}

let {
	class: className,
	ref = $bindable(),
	value = $bindable(""),
	...restProps
}: TextInputProps = $props();
</script>

<!--
@component
A styled replacement for the native text input, used for short, single-line text.
@see https://sveltique.dev/docs/components/browse/text-input
-->

<input
    bind:this={ref}
    bind:value
    type="text"
    data-text-input
    class={textInput({ className })}
    {...restProps}
/>
