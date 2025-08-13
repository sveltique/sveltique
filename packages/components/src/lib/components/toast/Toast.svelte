<script lang="ts">
	import type { WithTWMergeClass } from '$lib/types.js';
	import { ICONS } from './icons.js';
	import { toast, type ToastVariants } from './variants.js';
	import CloseIcon from '@tabler/icons-svelte/icons/x';
	import type { Snippet } from 'svelte';

	interface Props extends WithTWMergeClass<ToastVariants> {
		/** If passed, renders a close button. */
		onClose?: () => void;
		action?: Snippet;
		children: Snippet;
	}

	let { action, children, class: className, type = 'info', onClose }: Props = $props();

	let open = $state(true);

	let Icon = $derived(ICONS[type]);
	let { container, icon, content, closeButton, closeIcon } = $derived(toast({ type }));
</script>

{#if open}
	<div role="alert" class={container({ className })}>
		<Icon class={icon()} />
		<p class={content()}>
			{@render children()}
		</p>

		{#if action}
			{@render action()}
		{:else if onClose}
			<button onclick={onClose} class={closeButton()}>
				<CloseIcon class={closeIcon()} />
			</button>
		{/if}
	</div>
{/if}
