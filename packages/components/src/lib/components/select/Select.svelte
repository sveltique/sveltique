<script lang="ts">
import { onMount, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ClassNameValue } from "tailwind-merge";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type SelectVariants, select } from "./variants.js";

export interface SelectProps extends WithRef<HTMLDivElement>, SelectVariants {
	/**
	 * The ID of the trigger.
	 * @default —
	 */
	id?: string;
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/**
	 * Additional classes to add to the trigger.
	 * @default —
	 */
	class?: ClassNameValue;
	/**
	 * Additional classes to add to the root container.
	 * @deprecated Use `containerProps` instead.
	 * @default —
	 */
	containerClass?: ClassNameValue;
	/**
	 * Additional properties to customize the root container.
	 * @default {}
	 */
	containerProps?: ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>;
	/**
	 * The name of the input.
	 * @default —
	 */
	name?: string;
	/**
	 * The value of the select.
	 * @bindable
	 * @default —
	 */
	value?: string;
	/**
	 * The placeholder of the trigger.
	 * @default —
	 */
	placeholder?: string;
	/**
	 * Whether the select is valid or not.
	 * @default —
	 */
	"aria-invalid"?: boolean;
	/**
	 * The ID of the element describing the trigger.
	 * @default —
	 */
	"aria-describedby"?: string;
	/**
	 * Whether the select is open or not.
	 * @bindable
	 * @default false
	 */
	open?: SelectVariants["open"];
}

let {
	children,
	class: className,
	containerClass: __DEPRECATED_containerClass,
	containerProps = {},
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

let { class: containerClass, ...restContainerProps } = $derived(containerProps);
const {
	container,
	listBox,
	trigger,
	triggerContent,
	triggerIcon,
	placeholder: placeholderCss
} = $derived(select({ open }));

onMount(selectDefaultOption);
$effect(handleFocusedOption);

/* $effect(() => {
	if (!open && document.activeElement === listBoxRef) {
		triggerRef?.focus();
	}
}); */

/** If `value` is given, select the corresponding option. */
function selectDefaultOption() {
	if (!listBoxRef || !value) return;

	const elements = getListChildren();

	const defaultElement = elements.find(
		(element) =>
			element.hasAttribute("data-select-option") &&
			element.getAttribute("data-value") === value &&
			element.getAttribute("data-disabled") !== "true"
	);

	if (!defaultElement) return;

	value = defaultElement.getAttribute("data-value")!;
	valueContent = defaultElement.textContent;
}

/** Handles focus management when the listbox opens. */
function handleFocusedOption() {
	if (!open) return;

	const elements = getListChildren();

	const defaultElement =
		elements.find(
			(element) =>
				element.hasAttribute("data-select-option") &&
				element.getAttribute("data-value") === value &&
				element.getAttribute("data-disabled") !== "true"
		) ?? getFirstActiveOption();

	focusedId = defaultElement?.id;
}

function onGlobalClick(event: MouseEvent) {
	const target = event.target;

	// Invalid target, skip
	if (!target || !(target instanceof HTMLElement)) return;

	// Trigger handles its own onclick
	if (target === triggerRef) return;

	if (!listBoxRef.contains(target)) {
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
}

function onGlobalKeyDown(event: KeyboardEvent) {
	if (!open) return;

	const target = event.target;

	if (!target || !(target instanceof HTMLElement)) return;
	if (!ref || !ref.contains(target)) return;

	event.preventDefault();

	if (
		event.key === "Escape" ||
		(!focusedId && target === triggerRef && ["Enter", " "].includes(event.key))
	) {
		open = false;
		return;
	}

	if (!focusedId) return;

	const currentOption = getOptionById(focusedId);
	if (!currentOption) return;

	if (event.key === "Enter" || event.key === " ") {
		value = currentOption.getAttribute("data-value")!;
		valueContent = currentOption.textContent;
		open = false;
	} else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
		const sibling = getActiveSibling(currentOption, event.key === "ArrowUp");

		if (sibling) {
			focusedId = sibling.id;
		}
	}
}

function getListChildren() {
	return Array.from(listBoxRef.children) as HTMLLIElement[];
}

function getFirstActiveOption() {
	const elements = getListChildren();

	return elements.find((el) => el.getAttribute("data-disabled") !== "true");
}

function getOptionById(id: string) {
	const elements = getListChildren();

	return elements.find((element) => element.id === id);
}

function getActiveSibling(element: HTMLElement, previous: boolean = true) {
	const prop = previous ? "previousElementSibling" : "nextElementSibling";
	let sibling = element[prop] as HTMLElement | null;

	while (sibling) {
		const isOption = sibling.getAttribute("data-select-option");
		const isDisabled = sibling.getAttribute("data-disabled") === "true";

		if (isOption && !isDisabled) return sibling;

		sibling = sibling[prop] as HTMLElement | null;
	}

	return null;
}
</script>

<svelte:window onclick={onGlobalClick} onkeydown={onGlobalKeyDown} />

<div
    bind:this={ref}
    id={componentId}
    data-select
    class={container({ class: [__DEPRECATED_containerClass, containerClass] })}
    {...restContainerProps}
>
	<input type="hidden" {name} {value} />
	<button
		bind:this={triggerRef}
		{id}
		onclick={() => (open = !open)}
		role="combobox"
        data-select-trigger
		aria-activedescendant={focusedId}
		aria-controls="{componentId}-listbox"
		aria-expanded={open}
        aria-haspopup="listbox"
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
		{@render chevronDown()}
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

{#snippet chevronDown()}
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
{/snippet}
