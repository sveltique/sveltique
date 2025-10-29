<script lang="ts">
import type { TWMergeClass } from "@sveltique/components/types";
import type { Snippet } from "svelte";
import { cnBase } from "tailwind-variants";

interface Props extends TWMergeClass {
	children?: Snippet;
}

let { children, class: className }: Props = $props();
</script>

<th class={cnBase("px-6 py-4 text-start", className)}>
    {@render children?.()}
</th>
