<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { checkbox } from "./variants.js";

interface Props
	extends Omit<HTMLInputAttributes, "checked" | "class" | "disabled" | "type">,
		TWMergeClass,
		WithRef<HTMLInputElement> {
	checked?: boolean;
	disabled?: boolean;
}

let {
	checked = $bindable(),
	class: className = undefined,
	disabled,
	ref = $bindable(),
	...restProps
}: Props = $props();
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
