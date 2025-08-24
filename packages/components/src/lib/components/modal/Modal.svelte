<script lang="ts">
import { onMount, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { on } from "svelte/events";
import type { ReplaceWithTWMergeClass } from "$lib/types.js";
import { flyAndScale } from "../../transitions/fly-and-scale.js";
import Backdrop, { type BackdropProps } from "../backdrop/Backdrop.svelte";
import { modal } from "./variants.js";

type ChildrenSnippet = Snippet<
	[
		{
			close: VoidFunction;
			labelProps: { id: string };
			descriptionProps: { id: string };
		}
	]
>;

export interface ModalProps
	extends ReplaceWithTWMergeClass<Omit<HTMLAttributes<HTMLElement>, "children">> {
	actions?: Snippet<[{ close: VoidFunction }]>;
	children: ChildrenSnippet;
	trigger: Snippet<[{ open: VoidFunction }]>;
	/**
	 * Whether to close the modal if the overlay is clicked.
	 *
	 * This should only be enabled for low-stake modals.
	 * @default false
	 */
	closeOnOverlayClick?: boolean;
	/** @default false */
	isOpen?: boolean;
	/**
	 * Customize the backdrop component directly.
	 * @default {}
	 */
	backdropProps?: Omit<BackdropProps, "onClick">;
}

let {
	actions,
	children,
	trigger,
	class: className = undefined,
	closeOnOverlayClick = false,
	isOpen = $bindable(false),
	backdropProps = {},
	...restProps
}: ModalProps = $props();

const uid = $props.id();
let { actions: actionsCss, dialog } = $derived(modal());

onMount(() => {
	return on(
		window,
		"keyup",
		(event) => {
			if (event.key !== "Escape") return;

			isOpen = false;
		},
		{ passive: true }
	);
});

$effect(() => {
	document.body.style.overflow = isOpen ? "hidden" : "auto";
});

const open = () => (isOpen = true);
const close = () => (isOpen = false);
</script>

<!--
@component
A dialog component that interrupts the user flow to capture attention. Displays content in a centered overlay with a dimmed backdrop.
-->

{@render trigger({ open })}

{#if isOpen}
	<Backdrop onClick={() => closeOnOverlayClick && close()} {...backdropProps}>
		<div
			transition:flyAndScale={{ duration: 150 }}
			id={uid}
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="{uid}-label"
			aria-describedby="{uid}-description"
			class={dialog({ className })}
			{...restProps}
		>
			{@render children?.({
				close,
				labelProps: { id: `${uid}-label` },
				descriptionProps: { id: `${uid}-description` }
			})}

			{#if actions}
				<div class={actionsCss()}>
					{@render actions({ close })}
				</div>
			{/if}
		</div>
	</Backdrop>
{/if}
