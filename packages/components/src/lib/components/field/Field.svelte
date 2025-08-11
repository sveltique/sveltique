<script lang="ts">
	import { field } from './variants.js';
	import IconInfoCircle from '@tabler/icons-svelte/icons/info-circle';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';

	type InputSnippet = Snippet<
		[{ id: string; 'aria-invalid': boolean; 'aria-describedby': string | undefined }]
	>;

	interface Props {
		input: InputSnippet;
		class?: ClassNameValue;
		error?: string | undefined;
		label?: string | undefined;
	}

	let {
		class: className = undefined,
		input,
		error = undefined,
		label = undefined
	}: Props = $props();

	const id = $props.id();

	const { container, error: errorCss, label: labelCss } = $derived(field());
</script>

<!--
@component
Fields allow users to enter data into a UI.
-->

<div class={container({ className })}>
	<label for={id} class={labelCss()}>{label}</label>
	{@render input({
		id,
		'aria-invalid': !!error,
		'aria-describedby': error ? `${id}-error` : undefined
	})}
	{#if error}
		<p id="{id}-error" role="alert" class={errorCss()}>
			<IconInfoCircle class="min-w-5" />
			{error}
		</p>
	{/if}
</div>
