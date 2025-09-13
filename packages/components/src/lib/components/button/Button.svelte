<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import { on } from "svelte/events";
import { cnBase } from "tailwind-variants";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type ButtonVariants, button } from "./variants.js";

export interface ButtonProps
	extends ReplaceWithTWMergeClass<Omit<HTMLButtonAttributes, "color" | "disabled">>,
		ButtonVariants,
		WithRef<HTMLButtonElement> {}

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
}: ButtonProps = $props();

let hasClicked = $state(false);

$effect(() => {
	if (!ref) return;

	return on(ref, "click", () => {
		hasClicked = true;

		setTimeout(() => {
			hasClicked = false;
		}, 100);
	});
});
</script>

<!--
@component
Buttons allow users to take actions, and make choices, with a single tap.
@see https://sveltique.dev/docs/components/browse/button
-->

<button
	bind:this={ref}
	{type}
	{disabled}
    data-button
	aria-disabled={disabled}
	class={button({ shape, size, variant, color, disabled, className: cnBase(className, hasClicked && "duration-100 scale-[97%]") })}
	{...restProps}
>
	{@render children?.()}
</button>
