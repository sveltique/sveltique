import { getContext, setContext } from "svelte";

type TabsOrientation = "horizontal" | "vertical";

type TabsContextOptions = {
	uid: string;
	activeValue: string;
	orientation: TabsOrientation;
};

const LOCAL_CONTEXT_KEY = Symbol("TabsContext");

export function getLocalContext(): TabsContext {
	return getContext<TabsContext>(LOCAL_CONTEXT_KEY);
}

export function setLocalContext(options: TabsContextOptions): TabsContext {
	return setContext(LOCAL_CONTEXT_KEY, new TabsContext(options));
}

class TabsContext {
	private _uid = $state<string>()!;
	private _orientation = $state<TabsOrientation>()!;

	public activeValue = $state<string>()!;

	constructor(options: TabsContextOptions) {
		this._uid = options.uid;
		this.activeValue = options.activeValue;
		this._orientation = options.orientation;
	}

	get uid() {
		return this._uid;
	}

	get orientation() {
		return this._orientation;
	}
}
