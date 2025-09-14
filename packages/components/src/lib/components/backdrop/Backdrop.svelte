<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { type FadeParams, fade } from "svelte/transition";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { backdrop } from "./variants.js";

export interface BackdropProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement> {
	children?: Snippet;
	/**
	 * @default 150
	 * @deprecated Use `transitionProps` instead.
	 */
	fadeDuration?: number;
	transitionProps?: FadeParams;
	/**
	 * An alias for setting `style="z-index: XX"`.
	 * @default 10
	 */
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
	style,
	transitionProps,
	z = 10,
	...restProps
}: BackdropProps = $props();

let _transitionProps = $derived({ duration: fadeDuration, ...transitionProps });

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
	transition:fade={_transitionProps}
	onclick={onBackdropClick}
    data-backdrop
	aria-hidden={true}
	style="z-index: {z};{style}"
	class={backdrop({ className })}
    {...restProps}
>
	{@render children?.()}
</div>
