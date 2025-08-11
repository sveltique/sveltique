<script lang="ts">
	import { skeleton } from './variants.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithTWMergeClass } from '$lib/types.js';

	type Props = WithTWMergeClass<HTMLAttributes<HTMLDivElement>>;

	let { class: className = undefined, ...restProps }: Props = $props();

	const { container } = $derived(skeleton());
</script>

<!--
@component
A placeholder component to display while the content is loading.
-->

<div class={container({ className })} {...restProps}></div>
