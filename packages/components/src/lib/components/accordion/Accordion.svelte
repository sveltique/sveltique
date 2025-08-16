<script lang="ts">
	import { on } from 'svelte/events';
	import { accordion } from './variants.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ReplaceWithTWMergeClass } from '$lib/types.js';

	interface Props extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
		multiple?: boolean;
	}

	let { children, class: className }: Props = $props();

	let ref = $state<HTMLDivElement>();
	let value = $state<string>();

	const { container } = $derived(accordion());

	$effect(() => {
		return on(window, 'click', (event) => {
			const target = event.target;

			if (
				!target ||
				!(target instanceof HTMLElement) ||
				!target.hasAttribute('data-accordion-item')
			) {
				return;
			}

			value =
				value === target.getAttribute('data-value')!
					? undefined
					: target.getAttribute('data-value')!;
		});
	});

	$inspect(value);
</script>

<!--
@component
The root component for an accordion.

Usage :
```svelte
    <Accordion>
        <AccordionItem value="1">
            {#snippet summary()}
                Does this work ?
            {/snippet}

            <p>Yes it does !</p>
        </AccordionItem>
    </Accordion>
```
-->

<div bind:this={ref} data-selected-value={value} class={container({ className })}>
	{@render children?.()}
</div>
