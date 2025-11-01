import type { Padding } from "@floating-ui/dom";
import { createContext } from "$utils/create-context.svelte.js";

const DEFAULT_ARROW_PADDING = 0;

export const [getLocalContext, setLocalContext] = createContext<PopoverContext>();

export class PopoverContext {
    private _open: boolean;
    private _setOpen: (newOpen: boolean) => boolean;

    public id: string;
    public arrowPadding: Padding;

    public arrowRef: HTMLDivElement | undefined;
    public closeRef: HTMLButtonElement | undefined;
    public contentRef: HTMLDivElement | undefined;
    public triggerRef: HTMLButtonElement | undefined;

    constructor(id: () => string, open: () => boolean, setOpen: (newOpen: boolean) => boolean) {
        this._open = $derived(open());
        this._setOpen = setOpen;

        this.id = $derived(id());
        this.arrowPadding = $derived(DEFAULT_ARROW_PADDING);

        this.arrowRef = $derived(undefined);
        this.closeRef = $derived(undefined);
        this.contentRef = $derived(undefined);
        this.triggerRef = $derived(undefined);
    }

    get open() {
        return this._open;
    }

    set open(newOpen: boolean) {
        this._open = newOpen;
        this._setOpen(newOpen);
    }
}
