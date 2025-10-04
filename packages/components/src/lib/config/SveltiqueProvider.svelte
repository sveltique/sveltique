<script lang="ts">
import type { Snippet } from "svelte";
import { type ProviderContextOptions, setProviderContext } from "./context.svelte.js";

interface Props extends ProviderContextOptions {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
}

let { animation = "system", children }: Props = $props();

setProviderContext({ animation });
</script>

<!--
@component
A provider to handle global configs.
@see https://sveltique.dev/docs/components/configuration/sveltique-provider
-->

{@render children?.()}
