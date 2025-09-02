<script lang="ts">
import { untrack, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass } from "$lib/types.js";
import { onKeyUp } from "$utils/on-key.svelte.js";
import { flyAndScale } from "../../transitions/fly-and-scale.js";
import { default as Backdrop, type BackdropProps } from "../backdrop/Backdrop.svelte";
import { modal } from "./variants.js";

type Ref = { current: HTMLElement | undefined };

type TriggerSnippet = Snippet<[{ ref: Ref; open: VoidFunction }]>;

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
	children?: ChildrenSnippet;
	trigger?: TriggerSnippet;
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

let ref = $state<Ref>({ current: undefined });
let previousOpen = $state(isOpen);

let { actions: actionsCss, dialog } = $derived(modal());

if (closeOnOverlayClick) {
	onKeyUp("Escape", () => (isOpen = false));
}

$effect(() => {
	document.body.style.overflow = isOpen ? "hidden" : "auto";
});

$effect(() => {
	isOpen;

	untrack(() => {
		previousOpen = !isOpen;
	});
});

$effect(() => {
	if (previousOpen && !isOpen && ref.current) {
		ref.current.focus();
	}
});

const open = () => (isOpen = true);
const close = () => (isOpen = false);
</script>

<!--
@component
A dialog component that interrupts the user flow to capture attention. Displays content in a centered overlay with a dimmed backdrop.
@see https://sveltique.dev/docs/components/browse/modal
-->

{@render trigger?.({ ref, open })}

{#if isOpen}
	<Backdrop onClick={() => closeOnOverlayClick && close()} {...backdropProps}>
		<div
			transition:flyAndScale={{ duration: 150 }}
			id={uid}
			role="alertdialog"
            data-modal
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
				<div data-modal-actions class={actionsCss()}>
					{@render actions({ close })}
				</div>
			{/if}
		</div>
	</Backdrop>
{/if}
