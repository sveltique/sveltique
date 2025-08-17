<script lang="ts">
	import { on } from 'svelte/events';
	import { accordion } from './variants.js';
	import { onMount, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ReplaceWithTWMergeClass } from '$lib/types.js';

	interface Props extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
		/**
		 * Whether to make the first item expanded by default.
		 * @default false
		 * @see https://sveltique.dev/docs/components/browse/accordion#expand-by-default
		 */
		defaultExpand?: boolean;
		/**
		 * Which level heading to use for the accordion summaries.
		 * @default "h3"
		 * @see https://sveltique.dev/docs/components/browse/accordion#heading-level
		 */
		headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		/**
		 * Whether to allow one or multiple items expanded at a time.
		 * @default true
		 * @see https://sveltique.dev/docs/components/browse/accordion#only-expand-one-at-a-time
		 */
		multiple?: boolean;
	}

	let {
		children,
		class: className,
		defaultExpand = false,
		headingLevel = 'h3',
		multiple = true
	}: Props = $props();

	let ref = $state<HTMLDivElement>();
	let values = $state<string[]>([]);

	onMount(() => {
		if (!ref || !defaultExpand) return;
		if (!ref.firstElementChild?.firstElementChild) return;

		values = [ref.firstElementChild.firstElementChild.id];
	});

	$effect(() => {
		if (!ref) return;

		return on(ref, 'click', (event) => {
			const target = event.target;

			if (
				!target ||
				!(target instanceof HTMLElement) ||
				!target.hasAttribute('data-accordion-item')
			) {
				return;
			}

			const newValue = target.getAttribute('data-value')!;

			if (multiple) {
				if (values.includes(newValue)) {
					values = values.filter((v) => v !== newValue);
				} else {
					values.push(newValue);
				}
			} else {
				values = values.includes(newValue) ? [] : [newValue];
			}
		});
	});
</script>

<div
	bind:this={ref}
	data-heading-level={headingLevel}
	data-open-values={values.join(',')}
	class={accordion({ className })}
>
	{@render children?.()}
</div>
