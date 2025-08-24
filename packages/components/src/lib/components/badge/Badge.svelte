<script lang="ts">
	import { badge, type BadgeVariants } from './variants.js';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends BadgeVariants {
		children?: Snippet;
		class?: ClassNameValue;
	}

	let {
		children,
		class: className = undefined,
		variant = 'contained',
		number = false
	}: Props = $props();
</script>

<!--
@component
A small badge with rounded corners.

Change the color using the `class` property.
-->

<div class={badge({ variant, number, className })}>
	{@render children?.()}
</div>
