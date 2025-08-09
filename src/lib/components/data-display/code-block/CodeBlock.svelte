<script lang="ts">
	import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';
	import { cnBase } from 'tailwind-variants';
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

	$effect(() => {
		if (!isCopied) return;

		const timeout = setTimeout(() => (isCopied = false), 3000);

		return () => clearTimeout(timeout);
	});

	async function style() {
		return codeToHtml(code, { lang, theme });
	}

	async function copyToClipboard() {
		await navigator.clipboard.writeText(code);
	}
</script>

{#await style() then highlighted}
	<div
		class={cnBase('code-block group relative', showLineNumbers && 'show-line-numbers', className)}
	>
		{@html highlighted}

		<button
			onclick={async () => {
				isCopied = true;
				await copyToClipboard();
			}}
			class="absolute top-4 right-4 z-10 hidden cursor-pointer rounded-lg border border-zinc-300 bg-transparent p-2 duration-150 group-hover:block hover:bg-white"
		>
			<CopyIcon class="aspect-square h-5" />
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
