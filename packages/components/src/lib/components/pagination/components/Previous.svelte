<script lang="ts">
import type { PaginationItemProps } from "../types.js";
import { pagination } from "../variants.js";
import Item from "./Item.svelte";

let {
	"aria-label": ariaLabel = "Previous page",
	children,
	ref = $bindable(),
	...restProps
}: PaginationItemProps = $props();

let { icon } = $derived(pagination.previous({ containsText: !!children }));
</script>

<Item bind:ref data-pagination-previous aria-label={ariaLabel} {...restProps}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={icon()}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M15 6l-6 6l6 6" />
    </svg>
    {@render children?.()}
</Item>
