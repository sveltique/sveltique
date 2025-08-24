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
A visible, thin line to visually divide two items.
-->

<div
	role="separator"
	aria-orientation={orientation}
	aria-hidden="true"
	class={separator({ orientation, className })}
></div>
