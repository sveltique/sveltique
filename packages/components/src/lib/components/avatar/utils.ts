type GetChildOptions = {
	attribute: string;
};

type GetChildReturn<T> = T | undefined;

export function getChild<T>(element: HTMLElement, options: GetChildOptions): GetChildReturn<T> {
	const { attribute } = options;

	const children = Array.from(element.children) as HTMLElement[];
	return children.find(
		(el) => el instanceof HTMLElement && el.hasAttribute(attribute)
	) as GetChildReturn<T>;
}
