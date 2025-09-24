<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type CheckboxVariants, checkbox } from "./variants.js";

export interface CheckboxProps
	extends ReplaceWithTWMergeClass<Omit<HTMLInputAttributes, "checked" | "disabled" | "type">>,
		WithRef<HTMLInputElement>,
		CheckboxVariants {
	/**
	 * Whether the checkbox is checked or not.
	 * @bindable
	 * @default —
	 */
	checked?: CheckboxVariants["checked"];
	/**
	 * Whether the checkbox is disabled or not.
	 * @default false
	 */
	disabled?: CheckboxVariants["disabled"];
}

let {
	checked = $bindable(),
	class: className = undefined,
	disabled,
	ref = $bindable(),
	...restProps
}: CheckboxProps = $props();
</script>

<!--
@component
Checkboxes allow the user to select one or more items from a set.
@info Consider using a [\<Switch />](https://sveltique.dev/docs/components/browse/switch) if you only have one checkbox.
@see https://sveltique.dev/docs/components/browse/checkbox
-->

<input
    bind:this={ref}
	bind:checked
	{disabled}
	type="checkbox"
    data-checkbox
	class={checkbox({ checked, disabled, className })}
	{...restProps}
/>
