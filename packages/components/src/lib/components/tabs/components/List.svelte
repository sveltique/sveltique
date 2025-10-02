<script lang="ts">
import type { Snippet } from "svelte";
import { cnBase } from "tailwind-variants";
import { getLocalContext } from "../context.svelte.js";
import type { WithRef } from "$lib/types.js";

export interface TabsListProps extends WithRef<HTMLDivElement> {
	children?: Snippet;
}

let { children, ref = $bindable() }: TabsListProps = $props();

const context = getLocalContext();
</script>

<div
    bind:this={ref}
    id="{context.uid}-tablist"
    role="tablist"
    aria-orientation={context.orientation}
    class={cnBase("flex shrink-0", context.orientation === "vertical" && "flex-col")}
>
    {@render children?.()}
</div>
