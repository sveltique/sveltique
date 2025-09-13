<script lang="ts">
import { onMount, type Snippet } from "svelte";
import { on } from "svelte/events";
import type { ClassNameValue } from "tailwind-merge";
import type { WithRef } from "$lib/types.js";
import { type SelectVariants, select } from "./variants.js";

export interface SelectProps extends WithRef<HTMLDivElement>, SelectVariants {
	id?: string;
	children?: Snippet;
	class?: ClassNameValue;
	containerClass?: ClassNameValue;
	name?: string;
	value?: string;
	placeholder?: string;
	"aria-invalid"?: boolean;
	"aria-describedby"?: string;
}

let {
	children,
	class: className,
	containerClass,
	id,
	name,
	placeholder = "",
	ref = $bindable(),
	value = $bindable(),
	...restProps
}: SelectProps = $props();

const componentId = $props.id();

let triggerRef = $state<HTMLButtonElement>()!;
let listBoxRef = $state<HTMLUListElement>()!;

let open = $state(false);
let valueContent = $state<string | undefined>();

let focusedId = $state<string>();

const {
	container,
	listBox,
	trigger,
	triggerContent,
	triggerIcon,
	placeholder: placeholderCss
} = $derived(select({ open }));

onMount(() => {
	const elements = getListChildren();

	// Focused day is the first one if no value selected
	// Otherwise, the focused day starts at the current value
	if (!value) {
		focusedId = elements.at(0)?.id;
		return;
	}

	if (!listBoxRef) return;

	const defaultElement =
		elements.find(
			(element) =>
				element.hasAttribute("data-select-option") &&
				element.getAttribute("data-value") === value
		) ?? elements.at(0);

	if (!defaultElement) return;

	focusedId = defaultElement.id;
	value = defaultElement.getAttribute("data-value")!;
	valueContent = defaultElement.textContent;
});

$effect(() => {
	return on(window, "click", (event) => {
		const target = event.target;

		if (!target || !(target instanceof HTMLElement) || target === triggerRef) {
			return;
		}

		if (listBoxRef !== target && !listBoxRef.contains(target)) {
			open = false;
			return;
		}

		if (
			!target.hasAttribute("data-select-option") ||
			target.getAttribute("data-disabled") === "true"
		) {
			return;
		}

		value = target.getAttribute("data-value")!;
		valueContent = target.textContent;

		open = false;
	});
});

$effect(() => {
	if (!open) return;

	if (value) {
		const elements = getListChildren();

		const defaultElement =
			elements.find(
				(element) =>
					element.hasAttribute("data-select-option") &&
					element.getAttribute("data-value") === value
			) ?? elements.at(0);

		if (defaultElement) {
			focusedId = defaultElement.id;
		}
	}

	return on(window, "keydown", (event) => {
		event.preventDefault();

		if (!focusedId) return;
		if (event.key === "Escape") {
			open = false;
		}

		const child = getChildById(focusedId);
		if (!child) return;

		if (event.key === "ArrowUp") {
			if (!child.previousElementSibling) return;

			focusedId = child.previousElementSibling.id;
		} else if (event.key === "ArrowDown") {
			if (!child.nextElementSibling) return;

			focusedId = child.nextElementSibling.id;
		} else if (event.key === "Enter" || event.key === " ") {
			value = child.getAttribute("data-value")!;
			valueContent = child.textContent;

			open = false;
		}
	});
});

$effect(() => {
	if (open) return;

	const elements = getListChildren();

	if (!value) {
		focusedId = elements.at(0)?.id;
		return;
	} else {
		if (!listBoxRef) return;

		const defaultElement =
			elements.find(
				(element) =>
					element.hasAttribute("data-select-option") &&
					element.getAttribute("data-value") === value
			) ?? elements.at(0);

		if (!defaultElement) return;

		focusedId = defaultElement.id;
	}
});

function getListChildren() {
	return Array.from(listBoxRef.children) as HTMLLIElement[];
}

function getChildById(id: string) {
	const elements = getListChildren();

	return elements.find((element) => element.id === id);
}
</script>

<div bind:this={ref} id={componentId} data-select class={container({ class: containerClass })}>
	<input type="hidden" {name} {value} />
	<button
		bind:this={triggerRef}
		{id}
		onclick={() => (open = !open)}
		role="combobox"
        data-select-trigger
		aria-controls="{componentId}-listbox"
		aria-expanded={open}
		aria-activedescendant={focusedId}
		class={trigger()}
		{...restProps}
	>
		<span class={triggerContent()}>
			{#if valueContent}
				{valueContent}
			{:else}
				<span class={placeholderCss()}>{placeholder}</span>
			{/if}
		</span>
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
			class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down {triggerIcon()}"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M6 9l6 6l6 -6" />
		</svg>
	</button>
	<ul
		bind:this={listBoxRef}
		id="{componentId}-listbox"
		role="listbox"
		tabindex="-1"
        data-select-listbox
		data-selected-value={value}
		data-focused-id={focusedId}
		class={listBox()}
	>
		{@render children?.()}
	</ul>
</div>
