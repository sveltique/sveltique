<script lang="ts">
	import { codeToHTML, transformHTMLEntities } from './code-block.js';
	import { codeBlock } from './variants.js';
	import IconClipboard from '@tabler/icons-svelte/icons/clipboard';
	import IconClipboardCheck from '@tabler/icons-svelte/icons/clipboard-check';
	import type { BundledLanguage, BundledTheme } from 'shiki';
	import type { WithTWMergeClass } from '$lib/types.js';

	interface Props extends WithTWMergeClass {
		code: string;
		lang: BundledLanguage;
		theme: BundledTheme;
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
		highlightedLines = ''
	}: Props = $props();

	let isCopied = $state(false);
	let CopyIcon = $derived(isCopied ? IconClipboardCheck : IconClipboard);

	const { button, container, icon } = $derived(codeBlock());
	let _code = $derived(codeToHTML(code, { lang, theme, lines: highlightedLines }));

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

{#await _code then highlighted}
	<div class={container({ showLineNumbers, className })}>
		{@html highlighted}
		<button onclick={copy} class={button()}>
			<CopyIcon class={icon()} />
		</button>
	</div>
{/await}

<style>
	:global {
		pre {
			border-radius: 16px;
			padding: 20px 0;
			counter-reset: line;
			overflow-x: auto;

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
