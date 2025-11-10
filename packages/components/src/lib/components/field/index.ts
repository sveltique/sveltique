export type { FieldProps } from "./components/Root.svelte";
export { type FieldVariants, field } from "./variants.js";

import Content from "./components/Content.svelte";
import Error from "./components/Error.svelte";
import Helper from "./components/Helper.svelte";
import Root from "./components/Root.svelte";

export const Field = {
    Root,
    Content,
    Helper,
    Error,
};
