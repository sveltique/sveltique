<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { kbd } from "./variants.js";

interface Props
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLElement>>,
		WithRef<HTMLElement> {}

let { children, class: className, ref = $bindable(), ...restProps }: Props = $props();
</script>

<!--
@component
Denotes textual user input from a keyboard, voice input, or any other text entry device.
@see https://sveltique.dev/docs/components/browse/kbd
-->

<kbd bind:this={ref} data-kbd class={kbd()} {...restProps}>
	{@render children?.()}
</kbd>
