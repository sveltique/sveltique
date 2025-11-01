<script module lang="ts">
type SvelteMouseEvent = Parameters<MouseEventHandler<HTMLButtonElement>>[0];
</script>

<script lang="ts">
import { Button, type ButtonProps } from "$lib/components/button/index.js";
    import type { MouseEventHandler } from "svelte/elements";
import { getLocalContext } from "../context.svelte.js";
import { type PopoverCloseVariants, popoverClose } from "../variants.js";

export interface PopoverCloseProps extends ButtonProps, PopoverCloseVariants {
	/**
	 * The shape of the button to render.
	 * @default "square"
	 */
	shape?: ButtonProps["shape"];
	/**
	 * The size of the button to render.
	 * @default "small"
	 */
	size?: ButtonProps["size"];
	/**
	 * The variant of the button to render.
	 * @default "text"
	 */
	variant?: ButtonProps["variant"];
}

let {
	children = fallbackcloseIcon,
	class: className,
    onclick,
	ref = $bindable(),
	shape = "square",
	size = "small",
	variant = "text",
	...restProps
}: PopoverCloseProps = $props();

const context = getLocalContext();

$effect(() => {
	if (!ref) return;

	context.closeRef = ref;
});

function onClose(event: SvelteMouseEvent) {
    context.open = false;
	context.triggerRef?.focus();

    onclick?.(event)
}
</script>

<Button
    bind:ref
    onclick={onClose}
    {shape}
    {size}
    {variant}
    class={popoverClose({ className })}
    {...restProps}
>
    {@render children()}
</Button>

{#snippet fallbackcloseIcon()}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0
        0
        24
        24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icons-tabler-outline icon icon-tabler icon-tabler-x"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
    </svg>
{/snippet}
