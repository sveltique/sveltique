<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { Label } from "../label/index.js";
import { type FieldVariants, field } from "./variants.js";

type InputSnippetProps = {
	/** The ID to link the label and the input. */
	id: string;
	/** Whether the input is invalid or not. */
	"aria-invalid": boolean;
	/** If invalid, the ID of the error message, undefined otherwise. */
	"aria-describedby": string | undefined;
};

type InputSnippet = Snippet<
	[
		{
			props: InputSnippetProps;
		}
	]
>;

export interface FieldProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		FieldVariants {
	/** The form control of the field. */
	input: InputSnippet;
	/**
	 * The error message of the control.
	 * @default —
	 */
	error?: string | undefined;
	/**
	 * The helper text of the control.
	 * @default —
	 */
	helper?: string | undefined;
	/**
	 * The label of the control.
	 * @default —
	 */
	label?: string | undefined;
	/**
	 * The placement of the label.
	 * @default "top"
	 */
	placement?: FieldVariants["placement"];
	/**
	 * Additional properties to customize the control container.
	 * @default {}
	 */
	controlProps?: ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>;
}

let {
	class: className = undefined,
	controlProps = {},
	input,
	error = undefined,
	helper = undefined,
	label = undefined,
	placement = "top",
	ref = $bindable(),
	...restProps
}: FieldProps = $props();

const id = $props.id();

let { class: controlClass, ...restControlProps } = $derived(controlProps);

let {
	container,
	error: errorCss,
	helper: helperCss,
	labelInputContainer,
	icon
} = $derived(field({ placement }));

let inputProps: InputSnippetProps = $derived.by(() => {
	return {
		id,
		"aria-invalid": !!error,
		"aria-describedby": getInputDescribedBy()
	};
});

function getInputDescribedBy(): string | undefined {
	const ids = [helper && `${id}-helper`, error && `${id}-error`];
	return ids.filter(Boolean).join(" ") || undefined;
}
</script>

<!--
@component
Provides a consistent structure for form controls by integrating a label, helper text, and error message when supplied.
@see https://sveltique.dev/docs/components/browse/field
-->

<div bind:this={ref} data-field class={container({ className })} {...restProps}>
	<div
        data-field-control
        class={labelInputContainer({ class: controlClass })}
        {...restControlProps}
    >
        <Label for={id} data-field-label>{label}</Label>
        {@render input({ props: inputProps })}
    </div>
	{@render helperMessage()}
	{@render errorMessage()}
</div>

{#snippet helperMessage()}
    {#if helper}
		<p id="{id}-helper" role="note" data-field-helper class={helperCss()}>
			{helper}
		</p>
	{/if}
{/snippet}

{#snippet errorMessage()}
    {#if error}
		<p id="{id}-error" role="alert" data-field-error class={errorCss()}>
			{@render errorIcon()}
			{error}
		</p>
	{/if}
{/snippet}

{#snippet errorIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
		class="icon icon-tabler icons-tabler-filled icon-tabler-info-circle {icon()}"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path
			d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
		/>
	</svg>
{/snippet}
