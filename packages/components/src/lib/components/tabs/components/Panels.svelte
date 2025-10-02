<script lang="ts">
import type { Snippet } from "svelte";
import type { WithRef } from "$lib/types.js";

export interface TabsPanelsProps extends WithRef<HTMLDivElement> {
	children?: Snippet;
}

let { children, ref = $bindable() }: TabsPanelsProps = $props();
</script>

<div bind:this={ref} role="presentation" class="px-4 pt-2 pb-4">
    {@render children?.()}
</div>
