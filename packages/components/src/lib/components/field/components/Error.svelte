<script module lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { Ref, TWMergeClass } from "$lib/types.js";
import { fieldError } from "../variants.js";

type HTMLErrorAttributes = Omit<HTMLAttributes<HTMLDivElement>, "children"> & TWMergeClass;

export interface FieldErrorProps extends HTMLErrorAttributes, Ref<HTMLDivElement> {
	/** The error to show. */
	children?: Snippet;
	/**
	 * The error to show. Only renders if error is not undefined.
	 * @note `children` has precedence over this field.
	 */
	error?: string | { message: string };
	/**
	 * The icon of the error.
	 *
	 * Set to `false` to hide it.
	 * @default —
	 */
	icon?: Snippet | false;
}
</script>

<script lang="ts">
let {
	children,
	class: className,
    error,
	icon = fallbackIcon,
	ref = $bindable(),
	...restProps
}: FieldErrorProps = $props();

let errorMessage = $derived(error && (typeof error === "string" ? error : error.message))
</script>

<div bind:this={ref} role="alert" data-field-error class={fieldError({ className })} {...restProps}>
    {#if icon}
        {@render icon()}
    {/if}
    {#if children}
        {@render children()}
    {:else if errorMessage}
        {errorMessage}
    {/if}
</div>

{#snippet fallbackIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path
			d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
		/>
	</svg>
{/snippet}
