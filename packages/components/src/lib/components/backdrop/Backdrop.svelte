<script lang="ts">
import type { Snippet } from "svelte";
import { fade } from "svelte/transition";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { backdrop } from "./variants.js";

export interface BackdropProps extends TWMergeClass, WithRef<HTMLDivElement> {
	children?: Snippet;
	/** @default 150 */
	fadeDuration?: number;
	/** @default 10 */
	z?: number;
	/** @deprecated Use `onclick` instead. */
	onClick?: () => void;
	onclick?: () => void;
}

let {
	children,
	class: className,
	fadeDuration = 150,
	onclick,
	onClick,
	ref = $bindable(),
	z = 10
}: BackdropProps = $props();

function onBackdropClick(event: MouseEvent) {
	if (event.target !== ref) return;

	(onclick ?? onClick)?.();
}
</script>

<!--
@component
Narrows the user's focus to a particular element on the screen by adding a dimmed layer over your application.
@see https://sveltique.dev/docs/components/browse/backdrop
-->

<div
	bind:this={ref}
	transition:fade={{ duration: fadeDuration }}
	onclick={onBackdropClick}
    data-backdrop
	aria-hidden={true}
	style="z-index: {z}"
	class={backdrop({ className })}
>
	{@render children?.()}
</div>
