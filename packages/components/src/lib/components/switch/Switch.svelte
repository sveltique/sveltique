<script lang="ts" generics="T">
	import { switchTv, type SwitchVariants } from './variants.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { WithRef, ReplaceWithTWMergeClass } from '$lib/types.js';

	interface Props
		extends ReplaceWithTWMergeClass<Omit<HTMLButtonAttributes, 'disabled'>>,
			WithRef<HTMLButtonElement>,
			SwitchVariants {}

	let {
		checked = $bindable(false),
		class: className,
		disabled = false,
		name,
		value,
		ref = $bindable(),
		...restProps
	}: Props = $props();

	let { container, thumb } = $derived(switchTv({ checked, disabled, className }));
</script>

<input type="checkbox" {name} {checked} aria-hidden="true" class="hidden" />
<button
	bind:this={ref}
	onclick={() => !disabled && (checked = !checked)}
	{disabled}
	type="button"
	role="switch"
	aria-checked={checked}
	class={container({ className })}
	{...restProps}
>
	<div class={thumb()}></div>
</button>
