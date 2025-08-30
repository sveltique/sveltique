<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass } from "$lib/types.js";
import { kbd } from "./variants.js";

interface Props extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLElement>> {}

let { children, class: className, ...restProps }: Props = $props();
</script>

<kbd data-kbd class={kbd()} {...restProps}>
	{@render children?.()}
</kbd>
