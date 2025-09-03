<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type SkeletonVariants, skeleton } from "./variants.js";

interface Props
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLElement | HTMLDivElement>,
		SkeletonVariants {}

let { animation = "pulse", class: className, ref = $bindable(), ...restProps }: Props = $props();
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
