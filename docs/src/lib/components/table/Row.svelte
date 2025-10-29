<script lang="ts">
import type { TWMergeClass } from "@sveltique/components/types";
import type { Snippet } from "svelte";
import { cnBase } from "tailwind-variants";

interface Props extends TWMergeClass {
	children?: Snippet;
}

let { children, class: className }: Props = $props();
</script>

<tr class={cnBase("border-muted border-b", className)}>
    {@render children?.()}
</tr>
