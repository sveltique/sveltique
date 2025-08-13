import type { BundledLanguage, BundledTheme, CodeToTokensOptions, TokensResult } from 'shiki';

type ShikiModule = {
	/**
	 * Shorthand for `codeToTokens` with auto-loaded theme and language.
	 * A singleton highlighter it maintained internally.
	 *
	 * Differences from `highlighter.codeToTokens()`, this function is async.
	 */
	codeToTokens: (
		code: string,
		options: CodeToTokensOptions<BundledLanguage, BundledTheme>
	) => Promise<TokensResult>;
};

let shikiModule: ShikiModule;

async function loadShiki() {
	// @ts-ignore
	if (shikiModule) return shikiModule;

	try {
		shikiModule = await import('shiki');
		return shikiModule;
	} catch (err) {
		// shiki not installed
		throw new Error("You must install 'shiki' to use the CodeBlock component.");
	}
}

type CodeToHTMLOptions = {
	lang: BundledLanguage;
	theme: BundledTheme;
	/** @default [] */
	lines?: number[];
};

/** Enhanced `codeToHTML` to enable line highlighting. */
export async function codeToHTML(code: string, options: CodeToHTMLOptions) {
	const { lang, theme, lines = [] } = options;

	const { codeToTokens } = await loadShiki();

	const result = await codeToTokens(code, { lang, theme });

	const htmlLines = result.tokens.map((tokens, idx) => {
		const isHighlighted = lines.includes(idx + 1);
		const classes = isHighlighted ? ' highlighted-line' : '';

		const lineHtml = tokens
			.map((token) => {
				const color = token.color ? `color:${token.color}` : '';
				const bgColor = token.bgColor ? `background-color:${token.bgColor}` : '';

				return `<span style="${color};${bgColor}">${escapeHtml(token.content)}</span>`;
			})
			.join('');

		return `<span class="line${classes}">${lineHtml}</span>`;
	});

	return `<pre style="color: ${result.fg}; background-color: ${result.bg}"><code>${htmlLines.join('')}</code></pre>`;
}

function escapeHtml(str: string) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}
