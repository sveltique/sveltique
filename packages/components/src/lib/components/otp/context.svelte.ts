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
	public setValue: (newValue: string) => string;

	constructor(options: () => OTPContextOptions) {
		this.length = $state(options().length);
		this.activeCellIndex = $state(options().activeCellIndex);
		this.value = $state(options().value);
		this.setValue = $state(options().setValue);

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
