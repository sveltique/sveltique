<script lang="ts">
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from "shiki";
import { type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ClassNameValue } from "tailwind-merge";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { Button } from "../button/index.js";
import { Separator } from "../separator/index.js";
import { Tooltip } from "../tooltip/index.js";
import { assembleLines, parseNumberRanges, transformHTMLEntities } from "./code-block.js";
import { codeBlock } from "./variants.js";

export interface CodeBlockProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLPreElement>>,
		WithRef<HTMLDivElement> {
	/** The code to render. */
	code: string;
	/**
	 * Additional classes to add to the root container.
	 * @deprecated Use `containerProps` instead.
	 * @default —
	 */
	containerClass?: ClassNameValue;
	/**
	 * Additional properties to customize the root container.
	 * @default {}
	 */
	containerProps?: ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>;
	/** The language of the code to render. */
	lang: BundledLanguage;
	/** The theme of the code to render. */
	theme: BundledTheme;
	/** The shiki highlighter instance to use to highlight the code. */
	highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
	/**
	 * Whether to show the line numbers or not.
	 * @default false
	 */
	showLineNumbers?: boolean;
	/**
	 * The lines to highlight in the code.
	 * @default ""
	 */
	highlightedLines?: string;
	/**
	 * The filename of the code to render.
	 * @default —
	 */
	filename?: string;
	/**
	 * The icon of the code to render. Only works if you pass in a `filename`.
	 * @default —
	 */
	icon?: Snippet;
	/**
	 * The title of the copy button's tooltip.
	 * @default —
	 */
	copyTitle?: (isCopied: boolean) => string;
}

let {
	class: className,
	containerClass: __DEPRECATED_containerClass,
	containerProps = {},
	code,
	lang,
	theme,
	showLineNumbers = false,
	highlightedLines = "",
	highlighter,
	filename,
	ref = $bindable(),
	icon,
	copyTitle = fallbackCopyTitle,
	...restProps
}: CodeBlockProps = $props();

let { class: containerClass, ...restContainerProps } = $derived(containerProps);
let {
	code: codeCss,
	container,
	pre,
	header: headerCss,
	filename: filenameCss
} = $derived(codeBlock());

let isCopied = $state(false);

let iconSnippet = $derived(isCopied ? copiedIcon : copyIcon);
let parsedLines = $derived(parseNumberRanges(highlightedLines));
let tokensResult = $derived.by(() => {
	return highlighter.codeToTokens(transformHTMLEntities(code), { lang, theme });
});

$effect(() => {
	if (!isCopied) return;

	const timeout = setTimeout(() => (isCopied = false), 3000);

	return () => clearTimeout(timeout);
});

async function copy() {
	await navigator.clipboard.writeText(transformHTMLEntities(code));
	isCopied = true;
}

function fallbackCopyTitle(isCopied: boolean) {
	return isCopied ? "Copied" : "Copy to clipboard";
}
</script>

<!--
@component
Display syntax-highlighted code snippets. Ideal anywhere you need clear, readable code examples.
@info You must have [shiki](https://shiki.style/) installed to use this component.
@see https://sveltique.dev/docs/components/browse/code-block
-->

<div
    bind:this={ref}
    data-code-block
    style="color: {tokensResult.fg}; background-color: {tokensResult.bg}"
    class={container({ class: [__DEPRECATED_containerClass, containerClass] })}
    {...restContainerProps}
>
	{#if filename}
		{@render header()}
    {:else}
        {@render copyButton()}
	{/if}
	<pre
        data-code-block-pre
        data-show-line-numbers={showLineNumbers}
        class={pre({ className })}
        {...restProps}
    >
        <code data-code-block-code class={codeCss()}>
            {@html assembleLines(tokensResult.tokens, parsedLines)}
        </code>
    </pre>
</div>

{#snippet header()}
    <div data-code-block-header class={headerCss()}>
        <div data-code-block-filename class="relative flex justify-start items-center gap-2.5">
            {@render icon?.()}
            <p class={filenameCss()}>{filename}</p>
        </div>
        <Tooltip title={copyTitle(isCopied)}>
            {#snippet children({ props, ref })}
                <Button bind:ref={ref.current} onclick={copy} variant="text" shape="square" {...props}>
                    {@render iconSnippet()}
                </Button>
            {/snippet}
        </Tooltip>
    </div>
    <Separator class="bg-muted-foreground" />
{/snippet}

{#snippet copyButton()}
    <Tooltip title={copyTitle(isCopied)}>
        {#snippet children({ props, ref })}
            <Button
                bind:ref={ref.current}
                onclick={copy}
                variant="text"
                shape="square"
                class="absolute bg-muted z-10 right-3 {tokensResult.tokens.length === 1 ? "top-1/2 -translate-y-1/2" : "top-3"}"
                {...props}
            >
                {@render iconSnippet()}
            </Button>
        {/snippet}
    </Tooltip>
{/snippet}

{#snippet copyIcon()}
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
		class="icons-tabler-outline size-5 icon icon-tabler icon-tabler-clipboard"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
		<path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
	</svg>
{/snippet}

{#snippet copiedIcon()}
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
		class="icons-tabler-outline size-5 icon icon-tabler icon-tabler-check"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M5 12l5 5l10 -10" />
	</svg>
{/snippet}

<style>
	[data-code-block] pre :global {
        counter-reset: line;

        [data-code-line=""] {
            padding: 2px 1.25rem;
            min-width: max-content;

            &[data-highlighted="true"] {
                background-color: color-mix(in oklab, currentColor 12%, transparent);
            }
        }

		&[data-show-line-numbers="true"] [data-code-line]::before {
			counter-increment: line;
			content: counter(line);
			display: inline-block;
			width: 1rem;
			margin-right: 1.5rem;
			text-align: right;
			color: var(--color-muted-foreground);
		}
	}
</style>
