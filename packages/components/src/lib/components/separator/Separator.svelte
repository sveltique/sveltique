<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type SeparatorVariants, separator } from "./variants.js";

export interface SeparatorProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		SeparatorVariants {}

let {
	class: className = undefined,
	orientation = "horizontal",
	ref = $bindable(),
	...restProps
}: SeparatorProps = $props();
</script>

<!--
@component
A thin, visible line used to separate content and create visual grouping.
@see https://sveltique.dev/docs/components/browse/separator
-->

<div
    bind:this={ref}
	role="separator"
    data-separator
	aria-orientation={orientation}
	aria-hidden="true"
	class={separator({ orientation, className })}
    {...restProps}
></div>
