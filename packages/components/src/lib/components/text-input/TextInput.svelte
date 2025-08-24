<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import type { ClassNameValue } from "tailwind-merge";
import { type TextInputVariants, textInput } from "./variants.js";

interface Props extends Omit<HTMLInputAttributes, "class" | "value">, TextInputVariants {
	class?: ClassNameValue;
	value?: string;
}

let { class: className, value = $bindable(""), ...restProps }: Props = $props();
</script>

<input bind:value type="text" class={textInput({ className })} {...restProps} />
