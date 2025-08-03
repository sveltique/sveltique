<script lang="ts">
	import { onMount } from 'svelte';
	import { option } from './variants.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'class'> {
		value: string;
		class?: ClassNameValue;
		selected?: boolean;
		disabled?: boolean;
	}

	let {
		children,
		value,
		class: className,
		selected: _selected,
		disabled,
		...restProps
	}: Props = $props();

	let parent = $state<HTMLUListElement>();
	let ref = $state<HTMLLIElement>();

	let selected = $derived(_selected);
	const { container } = $derived(option({ selected }));

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
	{#if children}
		{@render children()}
	{:else}
		{value}
	{/if}
</li>
