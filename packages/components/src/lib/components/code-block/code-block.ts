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
	/** @default '' */
	lines?: string;
};

/** Enhanced `codeToHTML` to enable line highlighting. */
export async function codeToHTML(code: string, options: CodeToHTMLOptions) {
	const { lang, theme, lines = '' } = options;
	const parsedLines = parseNumberRanges(lines);

	const { codeToTokens } = await loadShiki();

	const result = await codeToTokens(transformHTMLEntities(code), { lang, theme });

	const htmlLines = result.tokens.map((tokens, idx) => {
		const isHighlighted = parsedLines.includes(idx + 1);
		const classes = isHighlighted ? ' highlighted' : '';

		let lineHtml = tokens
			.map((token) => {
				const color = token.color ? `color:${token.color}` : '';
				const bgColor = token.bgColor ? `background-color:${token.bgColor}` : '';

				let content = escapeHTML(token.content);
				if (content.length === 0) {
					content = '    ';
				}

				return `<span style="${color};${bgColor}">${content}</span>`;
			})
			.join('');

		if (lineHtml.length === 0) {
			lineHtml = '    ';
		}

		return `<span class="line${classes}">${lineHtml}</span>`;
	});

	return `<pre style="color: ${result.fg}; background-color: ${result.bg}"><code>${htmlLines.join('')}</code></pre>`;
}

export function transformHTMLEntities(str: string) {
	return str
		.replaceAll('&amp;', '&')
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&quot;', '"')
		.replaceAll('&#39;', "'");
}

function escapeHTML(str: string) {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

/**
 * @note You can use spaces.
 * @example
 * parseNumberRanges("1") // [1]
 * parseNumberRanges("1,5,9") // [1, 5, 9]
 * parseNumberRanges("1-3") // [1, 2, 3]
 * parseNumberRanges("1,3-6,14") // [1, 3, 4, 5, 6, 14]
 */
export function parseNumberRanges(ranges: string): number[] {
	const reducer = (acc: Set<number>, curr: string) => {
		if (/^\d+$/.test(curr)) {
			acc.add(Number(curr));
		} else if (/^\d+-\d+$/.test(curr)) {
			let [start, end] = curr.split('-').map(Number);

			if (start > end) {
				[start, end] = [end, start];
			}

			for (let i = start; i <= end; i++) {
				acc.add(Number(i));
			}
		}

		return acc;
	};

	return [
		...ranges
			.split(',')
			.map((range) => range.trim())
			.reduce(reducer, new Set<number>())
	].sort((a, b) => a - b);
}
