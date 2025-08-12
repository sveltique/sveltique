<script lang="ts" generics="T">
	import { switchTv, type SwitchVariants } from './variants.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { WithRef, WithTWMergeClass } from '$lib/types.js';

	interface Props
		extends Omit<HTMLButtonAttributes, 'class' | 'disabled'>,
			WithTWMergeClass,
			WithRef<HTMLButtonElement>,
			SwitchVariants {}

	let {
		checked = $bindable(false),
		class: className,
		disabled,
		ref = $bindable(),
		...restProps
	}: Props = $props();

	let { container, thumb } = $derived(switchTv({ checked, disabled, className }));
</script>

<button
	bind:this={ref}
	onclick={() => !disabled && (checked = !checked)}
	role="switch"
	aria-checked={checked}
	class={container({ className })}
	{...restProps}
>
	<div class={thumb()}></div>
</button>
