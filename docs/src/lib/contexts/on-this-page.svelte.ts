import { page } from "$app/state";
import { getContext, setContext, untrack } from "svelte";
import { on } from "svelte/events";

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
				return on(window, "DOMContentLoaded", (event) => {
					this._updateCurrent();
				});
			});

			$effect(() => {
				page.url.pathname;

				console.log("hello");

				untrack(() => this._updateCurrent());
			});
		});
	}

	private _updateCurrent() {
		this.current = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2, h3"))
			.filter((heading) => !heading.closest("[data-playground]"))
			.map((node) => {
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
