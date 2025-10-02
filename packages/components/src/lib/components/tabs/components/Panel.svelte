<script lang="ts">
import type { Snippet } from "svelte";
import { cnBase } from "tailwind-variants";
import type { WithRef } from "$lib/types.js";
import { getLocalContext } from "../context.svelte.js";

export interface TabsPanelProps extends WithRef<HTMLDivElement> {
	children?: Snippet;
	value: string;
}

let { children, ref = $bindable(), value }: TabsPanelProps = $props();

const context = getLocalContext();
</script>

<div
    bind:this={ref}
    id="{context.uid}-panel-{value}"
    role="tabpanel"
    data-value={value}
    aria-labelledby="{context.uid}-tab-{value}"
    class={cnBase(value !== context.activeValue && "hidden")}
>
    {@render children?.()}
</div>
