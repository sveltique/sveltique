<script lang="ts">
	import { cn } from '$utils/cn.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { paper, type PaperVariants } from './variants.js';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'>, PaperVariants {
		class?: ClassNameValue;
	}

	let {
		children,
		class: className = undefined,
		elevation = 1,
		variant = 'shadow',
		...restProps
	}: Props = $props();

	let _elevation = $derived(variant === 'outline' ? 0 : elevation);
</script>

<!--
@component
A surface to display content and actions.
-->

<div class={paper({ elevation: _elevation, variant, className })} {...restProps}>
	{@render children?.()}
</div>
