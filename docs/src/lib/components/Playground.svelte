<script lang="ts">
	import { apply } from '$utils/apply.js';
	import { replaceEntities } from '$utils/html.js';
	import { style } from '$utils/shiki.js';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { cn } from '$utils/cn.js';
	import { Paper, Separator } from '@sveltique/components';
	import { theme } from '$lib/contexts/theme.svelte';

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
			short: apply(code.short, replaceEntities, (v) => style(v, { dark: theme.isDark })),
			expanded: apply(code.expanded, replaceEntities, (v) => style(v, { dark: theme.isDark }))
		} satisfies Code;
	});
</script>

<Paper
	variant="outline"
	elevation={0}
	class="mb-4 flex w-full flex-col items-stretch overflow-hidden"
>
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
	<Separator />
	<div class="relative flex h-10 w-full items-center justify-end px-4 py-2">
		<button
			onclick={() => (expanded = !expanded)}
			class="cursor-pointer px-2 py-1 text-sm dark:text-zinc-100"
		>
			{expanded ? 'Collapse code' : 'Expand code'}
		</button>
	</div>

	{#if highlightedCode}
		{@const _code = expanded ? highlightedCode.expanded : highlightedCode.short}
		<div class="highlighted-code relative">
			{@html _code}
		</div>
	{/if}
</Paper>

<style lang="postcss">
	@reference '../../app.css';

	.highlighted-code :global {
		pre {
			border-radius: 0;
			padding: 20px 0;
			counter-reset: line;
			overflow-x: auto;

			* {
				font-family: 'Cascadia Code', sans-serif;
			}

			code {
				display: contents;
			}

			code .line {
				padding: 2px 20px;
				white-space: pre;
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
