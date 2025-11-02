<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type PaperVariants, paper } from "./variants.js";

export interface PaperProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		PaperVariants,
		WithRef<HTMLDivElement> {
	/**
	 * Establish a hierarchy between the different elevated surfaces.
	 *
	 * Has no effect if `variant` is not set to `"elevated"`.
	 * @default 1
	 */
	elevation?: PaperVariants["elevation"];
	/**
	 * The surface style of the paper.
	 * @default "outline"
	 */
	variant?: PaperVariants["variant"];
}

let {
	children,
	class: className = undefined,
	elevation = 1,
	ref = $bindable(),
	variant = "outline",
	...restProps
}: PaperProps = $props();
</script>

<!--
@component
A surface to organize related content together.
@see https://sveltique.dev/docs/components/browse/paper
-->

<div
    bind:this={ref}
    data-paper
    data-variant={variant}
    data-elevation={elevation}
    class={paper({ variant, elevation, className })}
    {...restProps}
>
    {@render children?.()}
</div>
