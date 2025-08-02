<script lang="ts">
	import { cn } from '$utils/cn.js';
	import { getContext, onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		value: string;
		selected?: boolean;
		disabled?: boolean;
	}

	let { children, value, class: className, selected, disabled, ...restProps }: Props = $props();

	let parent = $state<HTMLUListElement>();
	let ref = $state<HTMLLIElement>();

	let isSelected = $state(false);

	onMount(() => {
		parent = ref?.parentElement as HTMLUListElement;
	});

	$effect(() => {
		if (!parent) return;

		const observer = new MutationObserver(() => {
			isSelected = value === parent!.getAttribute('data-selected-value');
		});

		observer.observe(parent, {
			attributes: true,
			attributeFilter: ['data-selected-value']
		});

		isSelected = value === parent.getAttribute('data-selected-value');

		return () => observer.disconnect();
	});
</script>

<li
	bind:this={ref}
	role="option"
	data-select-option
	data-value={value}
	data-selected={selected}
	data-disabled={disabled}
	class={cn('cursor-pointer px-6 py-3', isSelected && 'bg-primary text-white')}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{value}
	{/if}
</li>
