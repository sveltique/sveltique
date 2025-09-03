export function toTitleCase(str: string) {
	if (str.length === 0) return '';

	return str.at(0)!.toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalize(slug: string) {
	return slug.split('-').map(toTitleCase).join(' ');
}
