<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type AspectRatioVariants, aspectRatio } from "./variants.js";

export interface AspectRatioProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLElement>>,
		WithRef<HTMLDivElement>,
		AspectRatioVariants {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/** The desired aspect ratio of the container. */
	ratio: number;
}

let {
	children,
	class: className,
	ratio,
	ref = $bindable(),
	style,
	...restProps
}: AspectRatioProps = $props();
</script>

<!--
@component
Displays content with a specified width to height ratio. Useful for images, videos, or embeds.
@see https://sveltique.dev/docs/components/browse/aspect-ratio
-->

<div
    bind:this={ref}
    data-aspect-ratio
    style="aspect-ratio: {ratio};{style}"
    class={aspectRatio({ className })}
    {...restProps}
>
    {@render children?.()}
</div>
