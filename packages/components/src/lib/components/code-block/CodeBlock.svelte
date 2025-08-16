<script lang="ts">
	import { assembleLines, parseNumberRanges, transformHTMLEntities } from './code-block.js';
	import { codeBlock } from './variants.js';
	import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';
	import type { TWMergeClass } from '$lib/types.js';

	export interface CodeBlockProps extends TWMergeClass {
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
	}: CodeBlockProps = $props();

	let isCopied = $state(false);

	let { code: codeCss, container } = $derived(codeBlock());

	let parsedLines = $derived(parseNumberRanges(highlightedLines));
	let tokensResult = $derived.by(() => {
		return highlighter.codeToTokens(transformHTMLEntities(code), { lang, theme });
	});

	$effect(() => {
		if (!isCopied) return;

		const timeout = setTimeout(() => (isCopied = false), 3000);

		return () => clearTimeout(timeout);
	});
</script>

<pre
	data-code-block
	data-show-line-numbers={showLineNumbers}
	style="color: {tokensResult.fg}; background-color: {tokensResult.bg}"
	class={container({ className })}>
    <code class={codeCss()}>
        {@html assembleLines(tokensResult.tokens, parsedLines)}
    </code>
</pre>

<style>
	:global(pre[data-code-block]) {
		counter-reset: line;

		& [data-code-line] {
			padding: 2px 20px;
		}

		&[data-show-line-numbers='true'] [data-code-line]::before {
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
