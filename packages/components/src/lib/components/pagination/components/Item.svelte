<script lang="ts">
import { type ButtonVariants, button } from "../../button/variants.js";
import type { PaginationItemProps } from "../types.js";

let {
	buttonVariants,
	children,
	class: className,
	isActive = false,
	ref = $bindable(),
	...restProps
}: PaginationItemProps = $props();

let _buttonVariants = $derived<ButtonVariants>({
	variant: isActive ? "contained" : "text",
	shape: "square",
	...(buttonVariants ?? {})
});
</script>

<li>
    <a
        bind:this={ref}
        data-pagination-item
        data-active={isActive}
        aria-current={isActive}
        class={button({
            ..._buttonVariants,
            className: [_buttonVariants.shape === "square" && "size-9", className]
        })}
        {...restProps}
    >
        {@render children?.()}
    </a>
</li>
