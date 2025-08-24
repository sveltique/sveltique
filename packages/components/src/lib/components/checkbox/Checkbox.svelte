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
	...restProps
}: Props = $props();
</script>

<!--
@component
A pre-styled checkbox.
-->

<input
	bind:checked
	{disabled}
	type="checkbox"
	class={checkbox({ checked, disabled, className })}
	{...restProps}
/>
