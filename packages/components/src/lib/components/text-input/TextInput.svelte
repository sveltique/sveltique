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

<input bind:this={ref} bind:value type="text" class={textInput({ className })} {...restProps} />
