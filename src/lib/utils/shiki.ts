import { createHighlighter, type BundledLanguage } from 'shiki';

const registeredLangs = ['svelte'] as const satisfies BundledLanguage[];

export const highlighter = await createHighlighter({
	themes: ['one-dark-pro'],
	langs: registeredLangs
});

export type StyleOptions = {
	/** @default "svelte" */
	lang?: (typeof registeredLangs)[number];
};

/** Style HTML with shiki. */
export function style(html: string, options: StyleOptions = {}) {
	const { lang = 'svelte' } = options;

	return highlighter.codeToHtml(html, {
		lang,
		theme: 'one-dark-pro'
	});
}
