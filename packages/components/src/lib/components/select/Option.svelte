<script lang="ts">
	import { onMount } from 'svelte';
	import { option } from './variants.js';
	import IconCheck from '@tabler/icons-svelte/icons/check';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ClassNameValue } from 'tailwind-merge';
	import { useMutationObserver } from '$utils/use-mutation-observer.svelte.js';

	interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'class'> {
		/** @default $props.id() */
		id?: string;
		value: string;
		class?: ClassNameValue;
		/** @default false */
		selected?: boolean;
		/** @default false */
		disabled?: boolean;
	}

	let {
		children,
		id,
		value,
		class: className,
		selected: _selected = false,
		disabled = false,
		...restProps
	}: Props = $props();

	const uid = $props.id();

	let parent = $state<HTMLUListElement>();
	let ref = $state<HTMLLIElement>();

	let focused = $state(false);
	let selected = $derived(_selected);
	let _id = $derived(id ?? uid);

	const { container } = $derived(option({ disabled, focused }));

	useMutationObserver(
		() => parent,
		() => {
			selected = value === parent!.getAttribute('data-selected-value');
		},
		{
			attributes: true,
			attributeFilter: ['data-selected-value']
		}
	);

	useMutationObserver(
		() => parent,
		() => {
			focused = _id === parent!.getAttribute('data-focused-id');
		},
		{
			attributes: true,
			attributeFilter: ['data-focused-id']
		}
	);

	onMount(() => {
		parent = ref?.parentElement as HTMLUListElement;
		selected = value === parent.getAttribute('data-selected-value');
	});

	$effect(() => {
		if (!parent) return;
	});
</script>

<!--
@component
An option in a select component.

Designed to be a drop-in replacement for the native `option` element.
-->

<li
	bind:this={ref}
	id={_id}
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
