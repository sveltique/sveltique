<script lang="ts">
import type { ClassNameValue } from "tailwind-merge";
import { type SeparatorVariants, separator } from "./variants.js";

interface Props extends SeparatorVariants {
	class?: ClassNameValue;
}

let { class: className = undefined, orientation = "horizontal" }: Props = $props();
</script>

<!--
@component
A thin, visible line used to separate content and create visual grouping.
@see https://sveltique.dev/docs/components/browse/separator
-->

<div
	role="separator"
    data-separator
	aria-orientation={orientation}
	aria-hidden="true"
	class={separator({ orientation, className })}
></div>
