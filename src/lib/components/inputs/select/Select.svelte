<script lang="ts">
	import { on } from 'svelte/events';
	import { paper } from '$lib/components/surfaces/index.js';
	import { cn } from '$utils/cn.js';
	import IconChevronDown from '@tabler/icons-svelte/icons/chevron-down';
	import { onMount, type Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { select } from './variants.js';

	interface Props {
		id?: string;
		children?: Snippet;
		class?: ClassNameValue;
		containerClass?: ClassNameValue;
		name?: string;
		value?: string;
		'aria-invalid'?: boolean;
	}

	let {
		id,
		children,
		class: className,
		containerClass,
		name,
		value = $bindable(),
		...restProps
	}: Props = $props();

	const componentId = $props.id();

	let triggerRef = $state<HTMLButtonElement>()!;
	let listBoxRef = $state<HTMLUListElement>()!;

	let open = $state(false);
	let valueContent = $state();

	const { container, listBox, trigger, triggerContent, triggerIcon } = $derived(select({ open }));

	onMount(() => {
		if (!value) return;

		const element = Array.from(listBoxRef.children).find(
			(element) => element.getAttribute('data-value') === value
		);

		if (!element) return;

		valueContent = element.textContent;
	});

	onMount(() => {
		if (value) return;
		if (!listBoxRef) return;

		const elements = Array.from(listBoxRef.children);
		const defaultElement =
			elements.find(
				(element) =>
					element.hasAttribute('data-select-option') &&
					element.getAttribute('data-selected') === 'true'
			) ?? elements.at(0);

		if (!defaultElement) return;

		value = (defaultElement as HTMLLIElement).getAttribute('data-value')!;
		valueContent = (defaultElement as HTMLLIElement).textContent;
	});

	$effect(() => {
		return on(window, 'click', (event) => {
			const target = event.target;

			if (!target || !(target instanceof HTMLElement) || target === triggerRef) {
				return;
			}

			if (listBoxRef !== target && !listBoxRef.contains(target)) {
				open = false;
				return;
			}

			if (!target.hasAttribute('data-select-option')) {
				return;
			}

			value = target.getAttribute('data-value')!;
			valueContent = target.textContent;

			open = false;
		});
	});
</script>

<div id={componentId} class={container({ class: containerClass })}>
	<input type="hidden" {name} {value} />
	<button
		bind:this={triggerRef}
		{id}
		role="combobox"
		aria-controls="{componentId}-listbox"
		aria-expanded={open}
		onclick={() => (open = !open)}
		class={trigger()}
		{...restProps}
	>
		<span class={triggerContent()}>{valueContent}</span>
		<IconChevronDown class={triggerIcon()} />
	</button>
	<ul
		bind:this={listBoxRef}
		id="{componentId}-listbox"
		role="listbox"
		data-selected-value={value}
		class={listBox()}
	>
		{@render children?.()}
	</ul>
</div>
