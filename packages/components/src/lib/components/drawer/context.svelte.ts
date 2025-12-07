import { createContext } from "$utils/create-context.js";

type GetSet<T> = { get: () => T; set: (value: T) => void };

type DrawerContextOptions = {
	open: GetSet<boolean>;
};

export const [getLocalContext, setLocalContext] = createContext<DrawerContext>();

export class DrawerContext {
	private _open: GetSet<boolean>;
	public triggerRef = $state<HTMLButtonElement>();

	constructor(options: DrawerContextOptions) {
		this._open = $derived(options.open);
	}

	get open() {
		return this._open.get();
	}

	set open(value: boolean) {
		this._open.set(value);
	}
}
