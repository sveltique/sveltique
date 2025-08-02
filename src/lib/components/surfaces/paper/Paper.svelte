<script lang="ts">
	import { cn } from '$utils/cn.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { paper, type PaperVariants } from './variant.js';

	interface Props extends HTMLAttributes<HTMLDivElement>, PaperVariants {}

	let {
		children,
		class: className = undefined,
		elevation = 1,
		variant = 'shadow',
		...restProps
	}: Props = $props();
</script>

<!--
@component
A surface to display content and actions.
-->

<div class={cn(paper({ elevation, variant }), className)} {...restProps}>
	{@render children?.()}
</div>
