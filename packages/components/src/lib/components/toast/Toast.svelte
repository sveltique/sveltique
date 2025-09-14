<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, TWMergeClass, WithRef } from "$lib/types.js";
import Button from "../button/Button.svelte";
import { type ToastVariants, toast } from "./variants.js";

export interface ToastProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		ToastVariants {
	closeAriaLabel?: string;
	/**
	 * If passed, renders a close button.
	 * @deprecated Use `onclose` instead.
	 */
	onClose?: () => void;
	/** If passed, renders a close button. */
	onclose?: () => void;
	action?: Snippet;
	children: Snippet;
	open?: boolean;
}

let {
	action,
	children,
	class: className,
	closeAriaLabel,
	onClose: __DEPRECATED_onClose,
	onclose,
	open = $bindable(true),
	ref = $bindable(),
	type = "info",
	...restProps
}: ToastProps = $props();

let onClose = $derived(onclose ?? __DEPRECATED_onClose);
let { container, icon, content, closeButton, closeIcon } = $derived(toast({ type }));
</script>

<!--
@component
Brief notifications of processes that have been or will be performed.
@see https://sveltique.dev/docs/components/browse/toast
-->

{#if open}
	<div bind:this={ref} role="alert" data-toast class={container({ className })} {...restProps}>
		{@render toastIcon()}

		<p data-toast-content class={content()}>
			{@render children()}
		</p>

		{#if action}
			{@render action()}
		{:else if onClose}
			<Button
				onclick={onClose}
				variant="text"
				size="small"
				shape="square"
                data-toast-close
				aria-label={closeAriaLabel}
				class={closeButton()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-x {closeIcon()}"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M18 6l-12 12" />
					<path d="M6 6l12 12" />
				</svg>
			</Button>
		{/if}
	</div>
{/if}

{#snippet toastIcon()}
	{#if type === 'success'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check {icon()}"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
			/>
		</svg>
	{:else if type === 'info'}
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
	{:else if type === 'warning'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="icon icon-tabler icons-tabler-filled icon-tabler-alert-triangle {icon()}"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />

			<path
				d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z"
			/>
		</svg>
	{:else if type === 'danger'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="icon icon-tabler icons-tabler-filled icon-tabler-exclamation-circle {icon()}"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1"
			/>
		</svg>
	{/if}
{/snippet}
