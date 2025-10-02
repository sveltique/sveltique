<script lang="ts">
import type { Snippet } from "svelte";
import { cnBase } from "tailwind-variants";
import type { WithRef } from "$lib/types.js";
import { setLocalContext } from "../context.svelte.js";

export interface TabsProps extends WithRef<HTMLDivElement> {
	children?: Snippet;
	/**
	 * The orientation of the tablist.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * The currently active tab.
	 * @bindable
	 */
	value: string;
}

let {
	children,
	orientation = "horizontal",
	ref = $bindable(),
	value = $bindable()
}: TabsProps = $props();

const uid = $props.id();

let context = setLocalContext({ uid, activeValue: value, orientation });
</script>

<div
    bind:this={ref}
    id={uid}
    data-tabs-root
    data-active-tab={context.activeValue}
    data-orientation={orientation}
    class={cnBase("flex", context.orientation === "horizontal" && "flex-col")}
>
    {@render children?.()}
</div>
