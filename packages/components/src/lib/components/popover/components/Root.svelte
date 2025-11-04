<script lang="ts">
import { createFocusTrap } from "focus-trap";
import type { Snippet } from "svelte";
import { tabbable } from "tabbable";
import { onKeyDown } from "$utils/on-key.svelte.js";
import { PopoverContext, setLocalContext } from "../context.svelte.js";

export interface PopoverProps {
	/**
	 * The ID to use for binding the trigger and the context.
	 * @default $props.id()
	 */
	id?: string;
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/**
	 * Whether the popover content is open or not.
	 * @bindable
	 * @default false
	 */
	open?: boolean;
}

let { children, id, open = $bindable(false) }: PopoverProps = $props();
const COMPONENT_ID = $props.id();

let popoverId = $derived(id ?? COMPONENT_ID);

const context = setLocalContext(
	new PopoverContext(
		() => popoverId,
		() => open,
		(newOpen: boolean) => (open = newOpen)
	)
);

$effect(() => {
	if (!context.contentRef || !context.open) return;

	const tabbables = tabbable(context.contentRef);
	if (tabbables.length === 0) return;

	const trap = createFocusTrap(context.contentRef, {
		allowOutsideClick: true,
		clickOutsideDeactivates: true,
		preventScroll: true
	});
	trap.activate();

	return () => trap.deactivate();
});

function onclick(event: MouseEvent) {
	if (!context.open || !context.triggerRef || !context.contentRef) return;
	if (event.target === context.triggerRef || context.contentRef.contains(event.target as Node)) {
		return;
	}

	context.open = false;
}

onKeyDown("Escape", (event) => {
	if (!context.open || !context.triggerRef || !context.contentRef) return;
	if (event.target !== context.triggerRef && !context.contentRef.contains(event.target as Node)) {
		return;
	}

	context.open = false;
	context.triggerRef?.focus();
});
</script>

<svelte:window {onclick} />

{@render children?.()}
