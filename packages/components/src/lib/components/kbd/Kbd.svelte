<script lang="ts">
	import type { WithTWMergeClass } from '$lib/types.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { kbd } from './variants.js';

	type Props = WithTWMergeClass<HTMLAttributes<HTMLElement>>;

	let { children, class: className, ...restProps }: Props = $props();
</script>

<kbd class={kbd()} {...restProps}>
	{@render children?.()}
</kbd>
