type GetSiblingOptions = {
	attribute: string;
	previous: boolean;
};

export function getSibling(element: HTMLElement, options: GetSiblingOptions): HTMLElement | null {
	const { attribute, previous } = options;

	let sibling: Element | null;

	if (previous) sibling = element.previousElementSibling;
	else sibling = element.nextElementSibling;

	while (sibling) {
		if (sibling instanceof HTMLElement && sibling.hasAttribute(attribute)) {
			return sibling;
		}

		if (previous) sibling = sibling.previousElementSibling;
		else sibling = sibling.nextElementSibling;
	}

	return null;
}
