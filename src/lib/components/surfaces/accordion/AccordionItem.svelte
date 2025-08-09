<script lang="ts">
	import { slide } from 'svelte/transition';
	import IconChevronDown from '@tabler/icons-svelte/icons/chevron-down';
	import { onMount, type Component, type ComponentType, type Snippet } from 'svelte';
	import { accordionItem } from './variants.js';
	import type { WithTWMergeClass } from '$lib/types.js';

	interface Props extends WithTWMergeClass {
		children: Snippet;
		summary: Snippet;
		value?: string;
		Icon?: ComponentType | Component;
	}

	let { children, class: className, summary, value, Icon: CustomIcon }: Props = $props();

	const uid = $props.id();

	let ref = $state<HTMLDivElement>();
	let parent = $state<HTMLDivElement>();
	let open = $state(false);

	let _value = $derived(value ?? uid);
	let Icon = $derived(CustomIcon ?? IconChevronDown);

	const {
		container,
		details,
		icon,
		iconContainer,
		summary: summaryCss,
		trigger
	} = $derived(accordionItem({ open }));

	onMount(() => {
		parent = ref?.parentElement as HTMLDivElement;
	});

	$effect(() => {
		if (!parent) return;

		const observer = new MutationObserver(() => {
			open = _value === parent!.getAttribute('data-selected-value');
		});

		observer.observe(parent, {
			attributes: true,
			attributeFilter: ['data-selected-value']
		});

		console.log(parent.getAttribute('data-selected-value'));

		open = _value === parent.getAttribute('data-selected-value');

		return () => observer.disconnect();
	});
</script>

<!--
@component
An individual item inside an accordion.

Props :
* `value` The value of the item, used for opening/closing the accordion.
-->

<div bind:this={ref} class={container({ className })}>
	<button
		id={uid}
		aria-controls="{uid}-details"
		data-accordion-item
		data-value={_value}
		class={trigger()}
	>
		<span class={summaryCss()}>{@render summary()}</span>
		<div class={iconContainer()}>
			<Icon class={icon()} />
		</div>
	</button>

	{#if open}
		<div id="{uid}-details" transition:slide={{ duration: 150 }} class={details()}>
			{@render children()}
		</div>
	{/if}
</div>
