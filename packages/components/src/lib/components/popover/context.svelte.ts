import { createContext } from "$utils/create-context.svelte.js";

export const [getLocalContext, setLocalContext] = createContext<PopoverContext>();

export class PopoverContext {
    public open: boolean;
    public triggerRef: HTMLButtonElement | undefined;

    constructor(open: () => boolean) {
        this.open = $derived(open());
        this.triggerRef = $derived(undefined);
    }
}
