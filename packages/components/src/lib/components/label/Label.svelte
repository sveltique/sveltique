<script lang="ts">
import type { HTMLLabelAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type LabelVariants, label } from "./variants.js";

export interface LabelProps
	extends ReplaceWithTWMergeClass<HTMLLabelAttributes>,
		LabelVariants,
		WithRef<HTMLLabelElement> {}

let { children, class: className, ref = $bindable(), ...restProps }: LabelProps = $props();
</script>

<!--
@component
Labels or describes an associated form control.
@see https://sveltique.dev/docs/components/browse/label
-->

<label bind:this={ref} data-label class={label({ className })} {...restProps}>
    {@render children?.()}
</label>
