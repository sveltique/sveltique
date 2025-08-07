<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { on } from 'svelte/events';
	import { fade } from 'svelte/transition';
	import { flyAndScale } from '$lib/transitions/fly-and-scale.js';
	import { modal } from './variants.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithTWMergeClass } from '$lib/types.js';

	interface Props extends WithTWMergeClass<HTMLAttributes<HTMLElement>> {
		actions?: Snippet;
		onClose: () => void;
	}

	let { actions, children, class: className = undefined, onClose, ...restProps }: Props = $props();

	const { actions: actionsCss, background, dialog } = $derived(modal());

	onMount(() => {
		return on(
			window,
			'keyup',
			(event) => {
				if (event.key !== 'Escape') return;

				onClose();
			},
			{ passive: true }
		);
	});
</script>

<!--
@component
A dialog component that interrupts the user flow to capture attention. Displays content in a centered overlay with a dimmed backdrop.
-->

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={onClose} transition:fade={{ duration: 150 }} class={background()}></div>
<div
	transition:flyAndScale={{ duration: 150 }}
	role="dialog"
	aria-modal="true"
	class={dialog({ className })}
	{...restProps}
>
	{@render children?.()}

	{#if actions}
		<div class={actionsCss()}>
			{@render actions()}
		</div>
	{/if}
</div>
