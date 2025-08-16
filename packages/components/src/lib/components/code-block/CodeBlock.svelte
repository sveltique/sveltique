<script lang="ts">
	import { codeToHTML, transformHTMLEntities } from './code-block.js';
	import { codeBlock } from './variants.js';
	import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';
	import type { WithTWMergeClass } from '$lib/types.js';

	interface Props extends WithTWMergeClass {
		code: string;
		lang: BundledLanguage;
		theme: BundledTheme;
		highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
		/** @default false */
		showLineNumbers?: boolean;
		/** @default '' */
		highlightedLines?: string;
	}

	let {
		class: className,
		code,
		lang,
		theme,
		showLineNumbers = false,
		highlightedLines = '',
		highlighter
	}: Props = $props();

	let isCopied = $state(false);

	let { button, container, icon } = $derived(codeBlock());
	let highlightedCode = $derived(
		codeToHTML(code, { lang, theme, lines: highlightedLines, highlighter })
	);

	$effect(() => {
		if (!isCopied) return;

		const timeout = setTimeout(() => (isCopied = false), 3000);

		return () => clearTimeout(timeout);
	});

	async function copy() {
		isCopied = true;
		await navigator.clipboard.writeText(transformHTMLEntities(code));
	}
</script>

<div class={container({ showLineNumbers, className })}>
	{@html highlightedCode}
	<button onclick={copy} class={button()}>
		{@render copyIcon()}
	</button>
</div>

{#snippet copyIcon()}
	{#if isCopied}
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
			class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-check {icon()}"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
			<path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
			<path d="M9 14l2 2l4 -4" />
		</svg>
	{:else}
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
			class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard {icon()}"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
			<path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
		</svg>
	{/if}
{/snippet}

<style>
	:global {
		pre {
			border-radius: 16px;
			padding: 20px 0;
			counter-reset: line;
			overflow-x: auto;
			font-size: 0.875rem;

			code {
				white-space: pre-wrap;
				display: flex;
				flex-direction: column;

				.line {
					padding: 2px 20px;

					&.highlighted {
						background-color: color-mix(in srgb, currentColor 12%, transparent);
					}
				}
			}
		}
	}

	.show-line-numbers :global {
		.line::before {
			counter-increment: line;
			content: counter(line);
			display: inline-block;
			width: 1rem;
			margin-right: 2rem;
			text-align: right;
			color: gray;
		}
	}
</style>
