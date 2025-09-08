<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type KbdVariants, kbd } from "./variants.js";

export interface KbdProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLElement>>,
		WithRef<HTMLElement>,
		KbdVariants {}

let { children, class: className, ref = $bindable(), ...restProps }: KbdProps = $props();
</script>

<!--
@component
Denotes textual user input from a keyboard, voice input, or any other text entry device.
@see https://sveltique.dev/docs/components/browse/kbd
-->

<kbd bind:this={ref} data-kbd class={kbd({ className })} {...restProps}>
	{@render children?.()}
</kbd>
