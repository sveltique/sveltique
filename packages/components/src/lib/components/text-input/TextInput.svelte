<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import type { ClassNameValue } from "tailwind-merge";
import type { WithRef } from "$lib/types.js";
import { type TextInputVariants, textInput } from "./variants.js";

interface Props
	extends Omit<HTMLInputAttributes, "class" | "value">,
		TextInputVariants,
		WithRef<HTMLElement | HTMLInputElement> {
	class?: ClassNameValue;
	value?: string;
}

let { class: className, ref = $bindable(), value = $bindable(""), ...restProps }: Props = $props();
</script>

<!--
@component
A styled replacement for the native text input, used for short, single-line text.
@see https://sveltique.dev/docs/components/browse/text-input
-->

<input bind:this={ref} bind:value type="text" data-text-input class={textInput({ className })} {...restProps} />
