<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type SkeletonVariants, skeleton } from "./variants.js";

export interface SkeletonProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		SkeletonVariants {}

let {
	animation = "pulse",
	class: className,
	ref = $bindable(),
	...restProps
}: SkeletonProps = $props();
</script>

<!--
@component
Placeholder used to indicate that content is loading, giving users a sense of the structure of the page while reducing perceived wait times.
@see https://sveltique.dev/docs/components/browse/skeleton
-->

<div
    bind:this={ref}
    data-skeleton
    aria-hidden="true"
    class={skeleton({ animation, className })}
    {...restProps}
></div>
