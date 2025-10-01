<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type FileInputVariants, fileInput } from "./variants.js";

export interface FileInputProps
	extends ReplaceWithTWMergeClass<Omit<HTMLInputAttributes, "disabled" | "files" | "type">>,
		WithRef<HTMLInputElement>,
		FileInputVariants {
	/**
	 * Whether the file input is disabled or not.
	 * @default false
	 */
	disabled?: FileInputVariants["disabled"];
	/**
	 * The first file of the input (readonly).
	 * @bindable
	 * @default —
	 */
	file?: File | null | undefined;
	/**
	 * The files of the input (readonly).
	 * @bindable
	 * @default —
	 */
	files?: FileList | null | undefined;
	/**
	 * The path of the first file, if any.
	 * @bindable
	 * @default ""
	 */
	value?: string;
}

let {
	class: className,
	disabled = false,
	file = $bindable(),
	files = $bindable(),
	ref = $bindable(),
	value = $bindable(""),
	...restProps
}: FileInputProps = $props();

$effect(() => {
	file = files?.[0];
});
</script>

<!--
@component
A styled replacement for the native file input element.
@see https://sveltique.dev/docs/components/browse/file-input
-->

<input
    bind:this={ref}
    bind:value
    bind:files
    type="file"
    {disabled}
    data-file-input
    data-disabled={disabled}
    class={fileInput({ disabled, className })}
    {...restProps}
/>

<style>
    input[type="file"] {
        cursor: pointer;
    }

    input[type="file"]::file-selector-button {
        height: calc(var(--spacing) * 11);
        margin-right: calc(var(--spacing) * 4);
        padding-block: calc(var(--spacing) * 2);
        padding-inline: calc(var(--spacing) * 4);
        color: var(--color-background);
        background-color: var(--color-primary);
        transition: background-color 150ms ease-in-out;
    }

    input[type="file"]:hover::file-selector-button {
        background-color: var(--color-primary-muted);
    }
</style>
