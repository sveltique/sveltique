<script lang="ts">
	import { slide } from 'svelte/transition';
	import { onMount, type Component, type ComponentType, type Snippet } from 'svelte';
	import { accordionItem } from './variants.js';
	import type { TWMergeClass } from '$lib/types.js';

	interface Props extends TWMergeClass {
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
			{#if CustomIcon}
				<CustomIcon />
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down {icon()}"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M6 9l6 6l6 -6" />
				</svg>
			{/if}
		</div>
	</button>

	{#if open}
		<div id="{uid}-details" transition:slide={{ duration: 150 }} class={details()}>
			{@render children()}
		</div>
	{/if}
</div>
