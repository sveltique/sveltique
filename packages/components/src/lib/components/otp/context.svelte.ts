import { getContext, setContext, untrack } from "svelte";

const KEY = Symbol("OTPContextKey");

export function getLocalContext(): OTPContext {
	return getContext(KEY);
}

export function setLocalContext(context: OTPContext): OTPContext {
	return setContext(KEY, context);
}

export class OTPContext {
	public root: HTMLDivElement | undefined;
	public length: number;
	public value: string[];
	public setValue: (newValue: string) => string;

	constructor(
		root: () => HTMLDivElement | undefined,
		length: () => number,
		value: () => string[],
		setValue: (newValue: string) => string
	) {
		this.root = $derived(root());
		this.length = $state(length());
		this.value = $state(value());
		this.setValue = setValue;

		$effect.root(() => {
			$effect(() => {
				this.setValue($state.snapshot(this.value).join(""));
			});
		});
	}

	/**
	 * The letter at `index` in `value`.
	 */
	public at(index: number): string | undefined {
		return this.value.at(index);
	}
}
