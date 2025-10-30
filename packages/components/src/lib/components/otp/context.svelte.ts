import { getContext, setContext, untrack } from "svelte";

type OTPContextOptions = {
	activeCellIndex: number;
	length: number;
	value: string[];
	setValue: (newValue: string) => string;
};

const KEY = Symbol("OTPContextKey");

export function getLocalContext(): OTPContext {
	return getContext(KEY);
}

export function setLocalContext(options: () => OTPContextOptions): OTPContext {
	return setContext(KEY, new OTPContext(options));
}

class OTPContext {
	public length: number;
	public activeCellIndex: number;
	public value: string[];

	constructor(options: () => OTPContextOptions) {
		this.length = $derived(options().length);
		this.activeCellIndex = $derived(options().activeCellIndex);
		this.value = $derived(options().value);

		$effect.root(() => {
			$effect(() => {
				options().setValue($state.snapshot(this.value).join(""));
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
