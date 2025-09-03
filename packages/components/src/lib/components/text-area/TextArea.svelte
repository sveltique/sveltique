<script lang="ts">
import type { HTMLTextareaAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { textArea } from "./variants.js";

interface Props
	extends ReplaceWithTWMergeClass<Omit<HTMLTextareaAttributes, "value">>,
		WithRef<HTMLElement | HTMLTextAreaElement> {
	value?: string;
}

let { class: className, ref = $bindable(), value = $bindable(), ...restProps }: Props = $props();
</script>

<!--
@component
A syled replacement for the native `textarea` element.
@info Consider using a [\<TextInput />](https://sveltique.dev/docs/components/browse/text-input) if you only need one line.
@see https://sveltique.dev/docs/components/browse/text-area
-->

<textarea
    bind:this={ref}
    bind:value
    data-text-area
    class={textArea({ className })}
    {...restProps}
></textarea>
