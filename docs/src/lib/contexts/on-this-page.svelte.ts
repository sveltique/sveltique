import { slugify } from '$utils/string.js';
import { getContext, setContext } from 'svelte';

const KEY = Symbol('onThisPageContext');

export function getOnThisPageContext(): OnThisPageContext {
	return getContext(KEY);
}

export function setOnThisPageContext(): OnThisPageContext {
	return setContext(KEY, new OnThisPageContext());
}

type FlatHeading = {
	id: string;
	label: string;
};

type Heading = FlatHeading & {
	items: FlatHeading[];
};

class OnThisPageContext {
	public current = $state<Heading[]>([]);

	public getFromDOM(): void {
		this.current = Array.from(document.querySelectorAll<HTMLHeadingElement>('h2, h3'))
			.map((node) => {
				node.id = slugify(node.textContent);
				const level = Number(node.tagName.substring(1)) as 2 | 3;

				return {
					id: node.id,
					label: node.textContent?.trim(),
					level
				};
			})
			.reduce((acc, curr) => {
				if (curr.level === 2) {
					acc.push({ id: curr.id, label: curr.label, items: [] });
				} else {
					acc.at(-1)?.items.push({ id: curr.id, label: curr.label });
				}

				return acc;
			}, [] as Heading[]);
	}
}
