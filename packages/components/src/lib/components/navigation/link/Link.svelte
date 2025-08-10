<script lang="ts">
	import { link } from './variants.js';
	import type { WithTWMergeClass } from '$lib/types.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends WithTWMergeClass<HTMLAnchorAttributes> {
		/**
		 * Shorthand for setting `target="_blank"` and `rel="noreferrer"`.
		 * @note Passing target and/or rel overrides the values set by `external`.
		 * @default false
		 */
		external?: boolean;
	}

	let {
		children,
		class: className,
		external = false,
		href,
		rel,
		target,
		...restProps
	}: Props = $props();

	let _target = $derived(target ?? (external ? '_blank' : undefined));
	let _rel = $derived(rel ?? (external ? 'noreferrer' : undefined));
</script>

<a {href} target={_target} rel={_rel} class={link({ className })} {...restProps}>
	{@render children?.()}
</a>
