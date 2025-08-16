import { createHighlighter, type BundledLanguage } from 'shiki';

const registeredLangs = ['svelte'] as const satisfies BundledLanguage[];

export const highlighter = await createHighlighter({
	themes: ['catppuccin-latte', 'one-dark-pro'],
	langs: registeredLangs
});

export type StyleOptions = {
	/** @default "svelte" */
	lang?: (typeof registeredLangs)[number];
	/** @default false  */
	dark?: boolean;
};

/** Style HTML with shiki. */
export function style(html: string, options: StyleOptions = {}) {
	const { lang = 'svelte', dark = false } = options;

	return highlighter.codeToHtml(html, {
		lang,
		theme: dark ? 'one-dark-pro' : 'catppuccin-latte'
	});
}
