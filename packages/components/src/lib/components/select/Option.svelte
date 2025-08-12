<script lang="ts">
	import { onMount } from 'svelte';
	import { option } from './variants.js';
	import IconCheck from '@tabler/icons-svelte/icons/check';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'class'> {
		value: string;
		class?: ClassNameValue;
		/** @default false */
		selected?: boolean;
		/** @default false */
		disabled?: boolean;
	}

	let {
		children,
		value,
		class: className,
		selected: _selected = false,
		disabled = false,
		...restProps
	}: Props = $props();

	let parent = $state<HTMLUListElement>();
	let ref = $state<HTMLLIElement>();

	let selected = $derived(_selected);
	const { container } = $derived(option({ selected, disabled }));

	onMount(() => {
		parent = ref?.parentElement as HTMLUListElement;
	});

	$effect(() => {
		if (!parent) return;

		const observer = new MutationObserver(() => {
			selected = value === parent!.getAttribute('data-selected-value');
		});

		observer.observe(parent, {
			attributes: true,
			attributeFilter: ['data-selected-value']
		});

		selected = value === parent.getAttribute('data-selected-value');

		return () => observer.disconnect();
	});
</script>

<!--
@component
An option in a select component.

Designed to be a drop-in replacement for the native `option` element.
-->

<li
	bind:this={ref}
	role="option"
	data-select-option
	data-value={value}
	data-selected={selected}
	data-disabled={disabled}
	class={container({ className })}
	{...restProps}
>
	{@render content()}

	{#if selected && !disabled}
		<IconCheck class="h-4 w-4" />
	{/if}
</li>

{#snippet content()}
	{#if children}
		{@render children()}
	{:else}
		{value}
	{/if}
{/snippet}
