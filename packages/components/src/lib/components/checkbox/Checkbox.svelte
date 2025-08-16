<script lang="ts">
	import { checkbox } from './variants.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WithRef, TWMergeClass } from '$lib/types.js';

	interface Props
		extends Omit<HTMLInputAttributes, 'checked' | 'class' | 'disabled' | 'type'>,
			TWMergeClass,
			WithRef<HTMLInputElement> {
		checked?: boolean;
		disabled?: boolean;
	}

	let {
		checked = $bindable(),
		class: className = undefined,
		disabled,
		...restProps
	}: Props = $props();
</script>

<!--
@component
A pre-styled checkbox.
-->

<input
	bind:checked
	{disabled}
	type="checkbox"
	class={checkbox({ checked, disabled, className })}
	{...restProps}
/>
