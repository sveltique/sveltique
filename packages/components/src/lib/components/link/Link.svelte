<script lang="ts">
	import { link, type LinkVariants } from './variants.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { ReplaceWithTWMergeClass } from '$lib/types.js';

	interface Props extends ReplaceWithTWMergeClass<HTMLAnchorAttributes>, LinkVariants {
		/**
		 * Shorthand for setting `target="_blank"` and `rel="noreferrer"`.
		 * @note Passing target and/or rel overrides the values set by `external`.
		 * @default false
		 */
		external?: boolean;
		/** @default "always" */
		underline?: 'always' | 'hover' | 'none';
	}

	let {
		children,
		class: className,
		external = false,
		href,
		rel,
		target,
		underline = 'always',
		...restProps
	}: Props = $props();

	let _target = $derived(target ?? (external ? '_blank' : undefined));
	let _rel = $derived(rel ?? (external ? 'noreferrer' : undefined));
</script>

<a {href} target={_target} rel={_rel} class={link({ className, underline })} {...restProps}>
	{@render children?.()}
</a>

<style>
	a[target='_blank']::after {
		content: ' ↗';
	}
</style>
