import { getContext, setContext, untrack } from "svelte";
import { page } from "$app/state";

const KEY = Symbol("onThisPageContext");

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

	constructor() {
		$effect.root(() => {
			$effect(() => {
				page.url.pathname;

				untrack(() => {
					this.current = this.update();
				});
			});
		});
	}

	public update() {
		const contentRef = document.getElementById("content");

		if (!contentRef) return [];

		const headings = contentRef.querySelectorAll<HTMLHeadingElement>("h2, h3");
		const allowedHeadings = this._filterContentHeadings(headings);

		const intermediateHeadings = allowedHeadings.map((node) => {
			const level = Number(node.tagName.substring(1)) as 2 | 3;

			return {
				id: node.id,
				label: node.textContent?.trim(),
				level
			};
		});

		return intermediateHeadings.reduce((acc, curr) => {
			if (curr.level === 2) {
				acc.push({ id: curr.id, label: curr.label, items: [] });
			} else {
				acc.at(-1)?.items.push({ id: curr.id, label: curr.label });
			}

			return acc;
		}, [] as Heading[]);
	}

	/** Only gets headings which are not in playground elements and don't include `data-no-sidebar`. */
	private _filterContentHeadings(headings: NodeListOf<HTMLHeadingElement>): HTMLHeadingElement[] {
		return Array.from(headings).filter((heading) => {
			return (
				!heading.closest("[data-playground]") && !heading.hasAttribute("data-no-sidebar")
			);
		});
	}
}
