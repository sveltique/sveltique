<script lang="ts">
import { onMount, type Snippet } from "svelte";
import { cnBase } from "tailwind-variants";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { getChild } from "./utils.js";

type Status = "loading" | "ready" | "error";

export interface AvatarProps extends TWMergeClass, WithRef<HTMLDivElement> {
	children: Snippet;
	/** @default "" */
	fallback?: string;
}

let { children, class: className, fallback = "", ref = $bindable() }: AvatarProps = $props();

let imageRef = $state<HTMLImageElement>();
let status = $state<Status>("loading");

onMount(() => {
	if (!ref) return;

	imageRef = getChild(ref, { attribute: "data-avatar-image" });
	if (!imageRef) return;

	imageRef.onload = () => (status = "ready");
	imageRef.onerror = () => (status = "error");
});

$effect(() => {
	if (!imageRef) return;

	if (status !== "ready") {
		imageRef.style.display = "none";
	} else {
		imageRef.style.display = "block";
	}
});
</script>

<div bind:this={ref} data-avatar class={cnBase("relative rounded-full h-10 aspect-square overflow-hidden", className)}>
    {@render children()}
    
    {#if status !== "loading"}
        <div>{fallback}</div>
    {/if}
</div>
