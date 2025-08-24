<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type ButtonVariants, button } from "./variants.js";

interface Props
	extends ReplaceWithTWMergeClass<Omit<HTMLButtonAttributes, "color" | "disabled">>,
		ButtonVariants,
		WithRef<HTMLElement | HTMLButtonElement> {}

let {
	children,
	class: className,
	disabled,
	ref = $bindable(),
	type = "button",
	color = "primary",
	shape = "rectangle",
	size = "medium",
	variant = "contained",
	...restProps
}: Props = $props();
</script>

<!--
@component
Buttons allow users to take actions, and make choices, with a single tap.
-->

<button
	bind:this={ref}
	{type}
	{disabled}
	aria-disabled={disabled}
	class={button({ shape, size, variant, color, disabled, className })}
	{...restProps}
>
	{@render children?.()}
</button>
