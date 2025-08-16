<script lang="ts">
	import { kbd } from './variants.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ReplaceWithTWMergeClass } from '$lib/types.js';

	interface Props extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLElement>> {}

	let { children, class: className, ...restProps }: Props = $props();
</script>

<kbd class={kbd()} {...restProps}>
	{@render children?.()}
</kbd>
