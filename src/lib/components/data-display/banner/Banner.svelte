<script lang="ts">
	import { icons } from './icons.js';
	import { banner, type BannerVariants } from './variants.js';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends BannerVariants {
		children?: Snippet;
		class?: ClassNameValue;
	}

	let { children, class: className = '', type = 'info' }: Props = $props();

	const { container, icon } = $derived(banner({ type, className }));
	const Icon = $derived(icons[type]);
</script>

<!--
@component
A visual message box used to communicate contextual feedback to users, such as information, success, warnings, or errors.
-->

<div role="alert" class={container({ className })}>
	<Icon class={icon()} />
	<span>{@render children?.()}</span>
</div>
