<script lang="ts">
	import { cn } from '$utils/cn.js';
	import { button, type ButtonVariants } from './variants.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'color' | 'disabled'>, ButtonVariants {
		ref?: HTMLButtonElement;
	}

	let {
		children,
		class: className,
		disabled,
		ref = $bindable(),
		type = 'button',
		shape = 'rectangle',
		size = 'medium',
		variant = 'contained',
		...restProps
	}: Props = $props();
</script>

<!--
@component
Buttons allow users to take actions, and make choices, with a single tap.
-->

<button
	bind:this={ref}
	{type}
	{disabled}
	aria-disabled={disabled}
	class={cn(button({ shape, size, variant }), className)}
	{...restProps}
>
	{@render children?.()}
</button>
