<script module lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Ref, TWMergeClass } from "$lib/types.js";
import { type FieldVariants, field } from "../variants.js";

type HTMLFieldAttribute = HTMLAttributes<HTMLDivElement> & TWMergeClass;

export interface FieldProps extends HTMLFieldAttribute, Ref<HTMLDivElement>, FieldVariants {
	/**
	 * The orientation of the field.
	 * @default "vertical"
	 */
	orientation?: FieldVariants["orientation"];
}
</script>

<script lang="ts">
let {
	children,
	class: className = undefined,
	orientation = "vertical",
	ref = $bindable(),
	...restProps
}: FieldProps = $props();
</script>

<!--
@component
Provides a consistent structure for form controls.
@see https://sveltique.dev/docs/components/browse/field
-->

<div bind:this={ref} data-field-root class={field({ orientation, className })} {...restProps}>
    {@render children?.()}
</div>
