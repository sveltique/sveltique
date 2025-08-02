<script lang="ts">
	import { cn } from '$utils/cn.js';
	import { field } from './variants.js';
	import IconInfoCircle from '@tabler/icons-svelte/icons/info-circle';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';

	interface Props {
		input?: Snippet<[{ id: string; 'aria-invalid': boolean }]>;
		class?: ClassNameValue;
		error?: string | undefined;
		label?: string | undefined;
		/** @default true */
		fullWidth?: boolean | undefined;
	}

	let {
		class: className = undefined,
		input,
		error = undefined,
		label = undefined,
		fullWidth = true
	}: Props = $props();

	const id = $props.id();

	const { container } = $derived(field({ fullWidth }));
</script>

<!--
@component
Fields allow users to enter data into a UI.
-->

<div class={cn(container(), className)}>
	<label for={id}>{label}</label>
	{@render input?.({ id, 'aria-invalid': !!error })}
	{#if error}
		<p id="{id}-error" role="alert" class="text-sm text-danger">
			<IconInfoCircle />
			{error}
		</p>
	{/if}
</div>
