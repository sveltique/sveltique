<script lang="ts">
	import { kbd } from './variants.js';
	import type { WithTWMergeClass } from '$lib/types.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithTWMergeClass<HTMLAttributes<HTMLElement>>;

	let { children, class: className, ...restProps }: Props = $props();
</script>

<kbd class={kbd()} {...restProps}>
	{@render children?.()}
</kbd>
