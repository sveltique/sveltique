<script lang="ts">
import { type Snippet, untrack } from "svelte";
import { cubicOut } from "svelte/easing";
import type { HTMLAttributes } from "svelte/elements";
import { type FlyParams, fly } from "svelte/transition";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { motionSafe } from "$utils/motion-safe.js";
import { onKeyUp } from "$utils/on-key.svelte.js";
import { Backdrop, type BackdropProps } from "../backdrop/index.js";
import { Portal } from "../portal/index.js";
import { type DrawerVariants, drawer } from "./variants.js";

type Ref = {
	/** @note Expects a subclass of `HTMLElement`. */
	// biome-ignore lint/suspicious/noExplicitAny: Not sure how to allow any subclass type of HTMLElement
	current: any | undefined;
};

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

export interface DrawerProps
	extends ReplaceWithTWMergeClass<Omit<HTMLAttributes<HTMLElement>, "children">>,
		WithRef<HTMLDivElement>,
		DrawerVariants {
	/**
	 * The actions of the drawer.
	 * @default —
	 */
	actions?: Snippet<[{ close: VoidFunction }]>;
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: ChildrenSnippet;
	/**
	 * The trigger of the drawer.
	 * @default —
	 */
	trigger?: TriggerSnippet;
	/**
	 * Whether to close the drawer if the overlay is clicked.
	 *
	 * This should only be enabled for low-stake drawers.
	 * @default false
	 */
	closeOnOverlayClick?: boolean;
	/**
	 * Whether the drawer is open or not.
	 * @bindable
	 * @default false
	 */
	isOpen?: boolean;
	/**
	 * Additional properties to customize the backdrop.
	 * @default {}
	 */
	backdropProps?: Omit<BackdropProps, "onClick">;
	/**
	 * The side from which the drawer appears.
	 * @default "right"
	 */
	from?: DrawerVariants["from"];
}

let {
	actions,
	children,
	trigger,
	backdropProps = {},
	class: className = undefined,
	closeOnOverlayClick = false,
	from = "right",
	isOpen = $bindable(false),
	ref = $bindable(),
	...restProps
}: DrawerProps = $props();

const uid = $props.id();

let triggerRef = $state<Ref>({ current: undefined });
let previousOpen = $state(isOpen);

let drawerFrom = $derived.by(() => {
	if (from === "right") {
		return { x: 100 };
	} else if (from === "left") {
		return { x: -100 };
	} else if (from === "top") {
		return { y: -100 };
	} else if (from === "bottom") {
		return { y: 100 };
	}
});
let transitionProps = $derived<FlyParams>({
	...drawerFrom,
	duration: motionSafe(0, 200),
	easing: cubicOut
});

let { actions: actionsCss, dialog } = $derived(drawer({ from }));

if (closeOnOverlayClick) {
	onKeyUp("Escape", () => (isOpen = false));
}

$effect(() => {
	document.body.style.overflow = isOpen ? "hidden" : "auto";

	untrack(() => {
		previousOpen = !isOpen;
	});
});

$effect(() => {
	if (previousOpen && !isOpen && triggerRef.current) {
		triggerRef.current.focus();
	}
});

const open = () => (isOpen = true);
const close = () => (isOpen = false);
</script>

<!--
@component
A panel that slides from the edge of the screen, and revealing contextual content.
@see https://sveltique.dev/docs/components/browse/drawer
-->

{@render trigger?.({ ref: triggerRef, open })}

{#if isOpen}
    <Portal target={document.body}>
        <Backdrop onClick={() => closeOnOverlayClick && close()} {...backdropProps}>
            <div
                bind:this={ref}
                transition:fly={transitionProps}
                id={uid}
                role="alertdialog"
                data-drawer
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
                    <div data-drawer-actions class={actionsCss()}>
                        {@render actions({ close })}
                    </div>
                {/if}
            </div>
        </Backdrop>
    </Portal>
{/if}
