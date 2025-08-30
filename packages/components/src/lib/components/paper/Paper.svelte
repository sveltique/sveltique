<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ClassNameValue } from "tailwind-merge";
import type { WithRef } from "$lib/types.js";
import { type PaperVariants, paper } from "./variants.js";

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, "class">,
		PaperVariants,
		WithRef<HTMLElement | HTMLDivElement> {
	class?: ClassNameValue;
}

let {
	children,
	class: className = undefined,
	elevation = 1,
	ref = $bindable(),
	variant = "shadow",
	...restProps
}: Props = $props();

let _elevation = $derived(variant === "outline" ? 0 : elevation);
</script>

<!--
@component
A surface to display content and actions.
-->

<div bind:this={ref} data-paper class={paper({ elevation: _elevation, variant, className })} {...restProps}>
	{@render children?.()}
</div>
