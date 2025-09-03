<script lang="ts">
import type { Snippet } from "svelte";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { type FieldVariants, field } from "./variants.js";

type InputSnippet = Snippet<
	[
		{
			props: {
				/** The ID to link the label and the input. */
				id: string;
				/** Whether the input is invalid or not. */
				"aria-invalid": boolean;
				/** If invalid, the ID of the error message, undefined otherwise. */
				"aria-describedby": string | undefined;
			};
		}
	]
>;

interface Props extends TWMergeClass, WithRef<HTMLElement | HTMLDivElement>, FieldVariants {
	input: InputSnippet;
	error?: string | undefined;
	label?: string | undefined;
}

let {
	class: className = undefined,
	input,
	error = undefined,
	label = undefined,
	placement = "top",
	ref = $bindable()
}: Props = $props();

const id = $props.id();

const {
	container,
	error: errorCss,
	label: labelCss,
	labelInputContainer,
	icon
} = $derived(field({ placement }));
</script>

<!--
@component
Provides a consistent structure for form controls, by including a label and an error message when provided.
@see https://sveltique.dev/docs/components/browse/field
-->

<div bind:this={ref} data-field class={container({ className })}>
	<div class={labelInputContainer()}>
        <label for={id} data-field-label class={labelCss()}>{label}</label>
        {@render input({
                props: {
                    id,
                    'aria-invalid': !!error,
                    'aria-describedby': error ? `${id}-error` : undefined
                }
        })}
    </div>
	{#if error}
		<p id="{id}-error" role="alert" data-field-error class={errorCss()}>
			{@render errorIcon()}
			{error}
		</p>
	{/if}
</div>

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
