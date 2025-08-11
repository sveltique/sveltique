<script lang="ts">
	import { textInput, type TextInputVariants } from './variants.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends Omit<HTMLInputAttributes, 'class' | 'value'>, TextInputVariants {
		class?: ClassNameValue;
		value?: string;
	}

	let { class: className, value = $bindable(''), ...restProps }: Props = $props();

	const { input } = $derived(textInput());
</script>

<input bind:value type="text" class={input({ className })} {...restProps} />
