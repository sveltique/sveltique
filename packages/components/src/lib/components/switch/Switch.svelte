<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type SwitchVariants, switchTv } from "./variants.js";

export interface SwitchProps
	extends ReplaceWithTWMergeClass<
			Omit<HTMLButtonAttributes, "disabled" | "onclick" | "ontoggle">
		>,
		WithRef<HTMLElement | HTMLButtonElement>,
		SwitchVariants {
	ontoggle?: (checked: boolean) => void;
}

let {
	checked = $bindable(false),
	class: className,
	disabled = false,
	name,
	value,
	ref = $bindable(),
	ontoggle,
	...restProps
}: SwitchProps = $props();

let { container, thumb } = $derived(switchTv({ checked, disabled, className }));

function onclick() {
	if (disabled) return;

	checked = !checked;
	ontoggle?.(checked);
}
</script>

<!--
@component
A binary on/off state in a more visual, accessible way than a standard checkbox.
@see https://sveltique.dev/docs/components/browse/switch
-->

<input type="checkbox" {name} bind:checked aria-hidden="true" class="hidden" />
<button
	bind:this={ref}
	{onclick}
	{disabled}
	type="button"
	role="switch"
    data-switch
	aria-checked={checked}
	class={container({ className })}
	{...restProps}
>
	<div data-switch-thumb class={thumb()}></div>
</button>
