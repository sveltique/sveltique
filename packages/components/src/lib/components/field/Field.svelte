<script lang="ts">
import type { Snippet } from "svelte";
import type { ClassNameValue } from "tailwind-merge";
import { field } from "./variants.js";

type InputSnippet = Snippet<
	[{ id: string; "aria-invalid": boolean; "aria-describedby": string | undefined }]
>;

interface Props {
	input: InputSnippet;
	class?: ClassNameValue;
	error?: string | undefined;
	label?: string | undefined;
}

let { class: className = undefined, input, error = undefined, label = undefined }: Props = $props();

const id = $props.id();

const { container, error: errorCss, label: labelCss, icon } = $derived(field());
</script>

<!--
@component
Fields allow users to enter data into a UI.
-->

<div data-field class={container({ className })}>
	<label for={id} data-field-label class={labelCss()}>{label}</label>
	{@render input({
		id,
		'aria-invalid': !!error,
		'aria-describedby': error ? `${id}-error` : undefined
	})}
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
