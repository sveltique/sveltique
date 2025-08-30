<script lang="ts">
import type { HTMLTextareaAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { textArea } from "./variants.js";

interface Props
	extends ReplaceWithTWMergeClass<Omit<HTMLTextareaAttributes, "value">>,
		WithRef<HTMLTextAreaElement> {
	value?: string;
}

let { class: className, ref = $bindable(), value = $bindable(), ...restProps }: Props = $props();
</script>

<textarea bind:value data-text-area class={textArea({ className })} {...restProps}></textarea>
