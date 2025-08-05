<script lang="ts">
	import { apply } from '$utils/apply.js';
	import { replaceEntities } from '$utils/html.js';
	import { style } from '$utils/shiki.js';
	import Separator from '$lib/components/data-display/separator/Separator.svelte';
	import Paper from '$lib/components/surfaces/paper/Paper.svelte';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { cn } from '$utils/cn.js';

	type Code = {
		short: string;
		expanded: string;
	};

	interface Props {
		children?: Snippet;
		controls?: Snippet;
		class?: ClassNameValue;
		code?: Code;
	}

	let { children, controls, class: className, code }: Props = $props();

	let expanded = $state(false);
	let highlightedCode = $derived.by(() => {
		if (!code) return;

		return {
			short: apply(code.short, replaceEntities, style),
			expanded: apply(code.expanded, replaceEntities, style)
		} satisfies Code;
	});
</script>

<Paper variant="outline" elevation={0} class="mb-4 flex w-full flex-col items-stretch">
	<div class="relative flex w-full items-stretch justify-between">
		<div class={cn('relative flex grow items-center justify-center gap-5 p-6', className)}>
			{@render children?.()}
		</div>
		{#if controls}
			<Separator orientation="vertical" />
			<div class="relative p-6">
				{@render controls()}
			</div>
		{/if}
	</div>

	{#if highlightedCode}
		{@const _code = expanded ? highlightedCode.expanded : highlightedCode.short}
		<div class="highlighted-code relative">
			{@html _code}

			<button
				onclick={() => (expanded = !expanded)}
				class="absolute top-4 right-4 cursor-pointer rounded-lg bg-primary px-2 py-1 text-sm text-white"
			>
				{expanded ? 'Collapse code' : 'Expand code'}
			</button>
		</div>
	{/if}
</Paper>

<style lang="postcss">
	@reference '../../app.css';

	.highlighted-code :global {
		pre {
			padding: 20px 0;
			counter-reset: line;
			overflow-x: scroll;

			* {
				font-family: 'Cascadia Code', sans-serif;
			}

			code .line {
				padding: 2px 20px;
			}

			code .line::before {
				counter-increment: line;
				content: counter(line);
				display: inline-block;
				width: 1rem;
				margin-right: 2rem;
				text-align: right;
				color: gray;
			}
		}
	}
</style>
