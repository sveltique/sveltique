<script lang="ts">
import type { HTMLLabelAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass } from "$lib/types.js";
import { type LabelVariants, label } from "./variants.js";

export interface LabelProps extends ReplaceWithTWMergeClass<HTMLLabelAttributes>, LabelVariants {}

let { children, class: className, ...restProps }: LabelProps = $props();
</script>

<!--
@component
Labels or describes an associated form control.
@see https://sveltique.dev/docs/components/browse/label
-->

<label data-label class={label({ className })} {...restProps}>
    {@render children?.()}
</label>
