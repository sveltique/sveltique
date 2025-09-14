<script lang="ts">
import { onMount, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { on } from "svelte/events";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { onKeyDown } from "$utils/on-key.svelte.js";
import { getActiveElement } from "$utils/use-active-element.svelte.js";
import { accordion } from "./variants.js";

export interface AccordionProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement> {
	children?: Snippet;
	/**
	 * Whether to make the first item expanded by default.
	 * @default false
	 * @see https://sveltique.dev/docs/components/browse/accordion#expand-by-default
	 */
	defaultExpand?: boolean;
	/**
	 * Which level heading to use for the accordion summaries.
	 * @default "h3"
	 * @see https://sveltique.dev/docs/components/browse/accordion#heading-level
	 */
	headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	/**
	 * Whether to allow one or multiple items expanded at a time.
	 * @default true
	 * @see https://sveltique.dev/docs/components/browse/accordion#only-expand-one-at-a-time
	 */
	multiple?: boolean;
}

let {
	children,
	class: className,
	defaultExpand = false,
	headingLevel = "h3",
	multiple = true,
	ref = $bindable(),
	...restProps
}: AccordionProps = $props();

const activeElement = getActiveElement();
let values = $state<string[]>([]);

onMount(() => {
	if (!ref || !defaultExpand) return;

	const firstChild = ref.querySelector("[data-accordion-item-trigger]");
	if (!firstChild) return;

	values = [firstChild.id];
});

$effect(() => {
	if (!ref) return;

	return on(ref, "click", (event) => {
		const target = event.target;

		if (
			!target ||
			!(target instanceof HTMLElement) ||
			!target.hasAttribute("data-accordion-item-trigger")
		) {
			return;
		}

		const newValue = target.getAttribute("data-value")!;

		if (multiple) {
			if (values.includes(newValue)) {
				values = values.filter((v) => v !== newValue);
			} else {
				values.push(newValue);
			}
		} else {
			values = values.includes(newValue) ? [] : [newValue];
		}
	});
});

onKeyDown(["ArrowUp", "ArrowDown"], preventArrowScroll, { preventDefault: true });

onKeyDown(
	["ArrowUp", "ArrowDown"],
	(event) => {
		if (!ref) return;

		if (event.key === "ArrowUp") {
			focusPrevious(ref);
		} else if (event.key === "ArrowDown") {
			focusNext(ref);
		}
	},
	{
		element: () => ref
	}
);

function preventArrowScroll(event: Event) {
	if (!ref) return;

	if (ref === activeElement.current || ref.contains(activeElement.current)) {
		event.preventDefault();
	}
}

function focusPrevious(container: HTMLElement) {
	if (!activeElement.current) return;

	const selector = [
		'a[href]:not([tabindex="-1"])',
		'button:not([disabled]):not([tabindex="-1"])',
		'input:not([disabled]):not([tabindex="-1"])',
		'select:not([disabled]):not([tabindex="-1"])',
		'textarea:not([disabled]):not([tabindex="-1"])',
		'[tabindex]:not([tabindex="-1"])'
	].join(",");

	const tabbables = Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
		(el) => el.offsetParent !== null
	);

	const idx = tabbables.indexOf(activeElement.current);
	if (idx >= 0) {
		const previous = tabbables.at(idx - 1);
		previous?.focus();
	}
}

function focusNext(container: HTMLElement) {
	if (!activeElement.current) return;

	const selector = [
		'a[href]:not([tabindex="-1"])',
		'button:not([disabled]):not([tabindex="-1"])',
		'input:not([disabled]):not([tabindex="-1"])',
		'select:not([disabled]):not([tabindex="-1"])',
		'textarea:not([disabled]):not([tabindex="-1"])',
		'[tabindex]:not([tabindex="-1"])'
	].join(",");

	const tabbables = Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
		(el) => el.offsetParent !== null
	);

	const idx = tabbables.indexOf(activeElement.current);
	if (idx >= 0) {
		const next = tabbables.at((idx + 1) % tabbables.length);
		next?.focus();
	}
}
</script>

<div
	bind:this={ref}
    data-accordion-root
	data-heading-level={headingLevel}
	data-open-values={values.join(',')}
	class={accordion({ className })}
    {...restProps}
>
	{@render children?.()}
</div>
