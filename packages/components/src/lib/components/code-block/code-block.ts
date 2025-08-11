import { codeToTokens, type BundledLanguage, type BundledTheme } from 'shiki';

type CodeToHTMLOptions = {
	lang: BundledLanguage;
	theme: BundledTheme;
	/** @default [] */
	lines?: number[];
};

/** Enhanced `codeToHTML` to enable line highlighting. */
export async function codeToHTML(code: string, options: CodeToHTMLOptions) {
	const { lang, theme, lines = [] } = options;

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
