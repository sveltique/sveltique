<script lang="ts">
	import { cn } from '$utils/cn.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { textInput, type TextInputVariants } from './variants.js';

	interface Props extends HTMLInputAttributes, TextInputVariants {}

	let { class: className, fullWidth = true, value = $bindable(''), ...restProps }: Props = $props();

	const { input } = $derived(textInput({ fullWidth }));
</script>

<input bind:value type="text" class={cn(input(), className)} {...restProps} />
