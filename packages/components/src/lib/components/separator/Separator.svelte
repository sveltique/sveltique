<script lang="ts">
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { type SeparatorVariants, separator } from "./variants.js";

interface Props extends TWMergeClass, WithRef<HTMLElement | HTMLDivElement>, SeparatorVariants {}

let {
	class: className = undefined,
	orientation = "horizontal",
	ref = $bindable()
}: Props = $props();
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
></div>
