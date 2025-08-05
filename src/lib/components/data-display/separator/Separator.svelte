<script lang="ts">
	import { cn } from '$utils/cn.js';
	import { separator, type SeparatorVariants } from './variants.js';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends SeparatorVariants {
		class?: ClassNameValue;
	}

	let { class: className = undefined, orientation = 'horizontal' }: Props = $props();
</script>

<!--
@component
A visible, thin line to visually divide two items.
-->

<div
	role="separator"
	aria-orientation={orientation}
	aria-hidden="true"
	class={separator({ orientation, className })}
></div>
