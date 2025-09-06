import Root from "./OTP.svelte";

// @ts-ignore
export const OTP: typeof Root & { Root: typeof Root } = Root;
// @ts-ignore
OTP.Root = Root;
