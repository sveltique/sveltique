import { getContext, setContext } from 'svelte';

const ACCORDION_CONTEXT_KEY = Symbol('accordion');

export function getAccordionContext(): AccordionContext {
	return getContext(ACCORDION_CONTEXT_KEY);
}

export function setAccordionContext(openValue: string | null): AccordionContext {
	return setContext(ACCORDION_CONTEXT_KEY, new AccordionContext(openValue));
}

export class AccordionContext {
	private _openValue: string | null = $state()!;

	constructor(openValue: string | null) {
		this._openValue = openValue;
	}

	get openValue() {
		return this._openValue;
	}

	setOpen(value: string) {
		if (this._openValue === value) {
			this._openValue = null;
		} else {
			this._openValue = value;
		}
	}
}
