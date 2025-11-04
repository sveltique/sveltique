import { createContext } from "$utils/create-context.svelte.js";

export const [getLocalContext, setLocalContext] = createContext<RadioGroupContext>();

export class RadioGroupContext {
    private _value: string;
    private _setValue: (newValue: string) => string;

    public name: string;

    constructor(name: () => string, value: () => string, setValue: (newValue: string) => string) {
        this._value = $derived(value());
        this._setValue = setValue;

        this.name = $derived(name());
    }

    get value() {
        return this._value;
    }

    set value(newValue: string) {
        this._value = newValue;
        this._setValue(newValue);
    }
}
