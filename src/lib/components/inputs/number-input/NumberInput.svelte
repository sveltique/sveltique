<script lang="ts">
	import { numberInput } from './variants.js';
	import { cn } from '$utils/cn.js';
	import IconMinus from '@tabler/icons-svelte/icons/minus';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'step' | 'min' | 'max' | 'value'> {
		/** @default 0 */
		value?: number;
		/** @default true */
		fullWidth?: boolean | undefined;
		step?: number | undefined;
		min?: number | undefined;
		max?: number | undefined;
	}

	let {
		id,
		class: className,
		fullWidth = true,
		value = $bindable(0),
		step = 1,
		min,
		max,
		...restProps
	}: Props = $props();

	const { container, input } = $derived(numberInput({ fullWidth }));
</script>

<div class={container()}>
	<button
		onclick={() => (value -= step)}
		class="relative grid aspect-square h-full place-items-center"
	>
		<IconMinus class="size-4" />
	</button>
	<input
		{id}
		bind:value
		type="number"
		{step}
		{min}
		{max}
		class={cn(
			input(),
			/* 'relative h-11 rounded-2xl border border-grey-soft px-4 text-sm dark:border-grey-soft-dark', */
			className
		)}
		{...restProps}
	/>
	<button
		onclick={() => (value += step)}
		class="relative grid aspect-square h-full place-items-center"
	>
		<IconPlus class="size-4" />
	</button>
</div>
