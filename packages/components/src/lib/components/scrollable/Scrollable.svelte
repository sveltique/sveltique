<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type ScrollableVariants, scrollable } from "./variants.js";

export interface ScrollableProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		ScrollableVariants {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
}

let {
	children,
	class: className,
	ref = $bindable(),
	style,
	...restProps
}: ScrollableProps = $props();
</script>

<!--
@component
Provides a scrollable container for overflowing content.
@see https://sveltique.dev/docs/components/browse/scrollable
-->

<div
    bind:this={ref}
    data-scrollable
    style="scrollbar-gutter: stable;{style ?? ""}"
    class={scrollable({ className })}
    {...restProps}
>
    {@render children?.()}
</div>
