export function replaceEntities(html: string) {
	return html.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
}
