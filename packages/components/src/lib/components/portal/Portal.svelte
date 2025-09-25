<script lang="ts">
import type { Snippet } from "svelte";
import type { WithRef } from "$lib/types.js";

export interface PortalProps extends WithRef<HTMLDivElement> {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/** Where to portal the content. */
	target: string | HTMLElement | null | undefined;
}

let { children, ref = $bindable(), target }: PortalProps = $props();

let targetElement = $derived.by(() => {
	if (typeof target !== "string") return target;

	return document.querySelector(target);
});

$effect(() => {
	if (!ref || !targetElement) return;

	targetElement.appendChild(ref);

	return () => {
		if (!ref || !targetElement.contains(ref)) return;

		targetElement.removeChild(ref);
	};
});
</script>

<!--
@component
Renders content outside of its natural DOM hierarchy.
@see https://sveltique.dev/docs/components/browse/portal
-->

<div bind:this={ref} data-portal>
    {@render children?.()}
</div>
