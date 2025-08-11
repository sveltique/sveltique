<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { badge } from './variants.js';

	interface Props {
		children?: Snippet;
		class?: ClassNameValue;
	}

	let { children, class: className = undefined }: Props = $props();
</script>

<!--
@component
A small badge with rounded corners.

Change the color using the `class` property.
-->

<div class={badge({ className })}>
	{@render children?.()}
</div>
