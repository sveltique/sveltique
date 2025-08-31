<script lang="ts" generics="T">
import type { HTMLButtonAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type SwitchVariants, switchTv } from "./variants.js";

interface Props
	extends ReplaceWithTWMergeClass<Omit<HTMLButtonAttributes, "disabled">>,
		WithRef<HTMLButtonElement>,
		SwitchVariants {}

let {
	checked = $bindable(false),
	class: className,
	disabled = false,
	name,
	value,
	ref = $bindable(),
	...restProps
}: Props = $props();

let { container, thumb } = $derived(switchTv({ checked, disabled, className }));
</script>

<!--
@component
A binary on/off state in a more visual, accessible way than a standard checkbox.
@see https://sveltique.dev/docs/components/browse/switch
-->

<input type="checkbox" {name} {checked} aria-hidden="true" class="hidden" />
<button
	bind:this={ref}
	onclick={() => !disabled && (checked = !checked)}
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
