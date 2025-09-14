<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { pagination } from "../variants.js";

export interface PaginationRootProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLUListElement>>,
		WithRef<HTMLUListElement> {}

let { children, class: className, ref = $bindable(), ...restProps }: PaginationRootProps = $props();
</script>

<ul
    bind:this={ref}
    data-pagination-root
    class={pagination.root({ className })}
    {...restProps}
>
    {@render children?.()}
</ul>
