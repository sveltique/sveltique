<script lang="ts">
	import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';
	import { codeBlock } from './variants.js';
	import IconClipboard from '@tabler/icons-svelte/icons/clipboard';
	import IconClipboardCheck from '@tabler/icons-svelte/icons/clipboard-check';
	import type { WithTWMergeClass } from '$lib/types.js';

	interface Props extends WithTWMergeClass {
		code: string;
		lang: BundledLanguage;
		theme: BundledTheme;
		/** @default false */
		showLineNumbers?: boolean;
	}

	let { class: className, code, lang, theme, showLineNumbers = false }: Props = $props();

	let isCopied = $state(false);
	let CopyIcon = $derived(isCopied ? IconClipboardCheck : IconClipboard);

	const { button, container, icon } = $derived(codeBlock());

	$effect(() => {
		if (!isCopied) return;

		const timeout = setTimeout(() => (isCopied = false), 3000);

		return () => clearTimeout(timeout);
	});

	async function copy() {
		isCopied = true;
		await navigator.clipboard.writeText(code);
	}
</script>

{#await codeToHtml(code, { lang, theme }) then highlighted}
	<div class={container({ showLineNumbers, className })}>
		{@html highlighted}
		<button onclick={copy} class={button()}>
			<CopyIcon class={icon()} />
		</button>
	</div>
{/await}

<style>
	.code-block :global {
		pre {
			border-radius: 16px;
			padding: 20px 0;
			counter-reset: line;
			overflow-x: scroll;

			code {
				white-space: pre-wrap;

				.line {
					padding: 2px 20px;
				}
			}
		}
	}

	.code-block.show-line-numbers :global code .line::before {
		counter-increment: line;
		content: counter(line);
		display: inline-block;
		width: 1rem;
		margin-right: 2rem;
		text-align: right;
		color: gray;
	}
</style>
