<script lang="ts">
import type { Snippet } from "svelte";
import { cnBase } from "tailwind-variants";
import { Button } from "$lib/components/button/index.js";
import type { WithRef } from "$lib/types.js";
import { getLocalContext } from "../context.svelte.js";

export interface TabsItemProps extends WithRef<HTMLButtonElement> {
	children?: Snippet;
	/**
	 * The value of the tab, used to identify which tab is open.
	 * @default ""
	 */
	value?: string;
	/**
	 * Whether the tab is disabled or not.
	 * @default false
	 */
	disabled?: boolean;
}

let { children, disabled = false, ref = $bindable(), value = "" }: TabsItemProps = $props();

const context = getLocalContext();
</script>

<Button
    bind:ref
    {disabled}
    onclick={() => !disabled && (context.activeValue = value)}
    id="{context.uid}-tab-{value}"
    variant="text"
    role="tab"
    tabindex={value === context.activeValue ? 0 : -1}
    data-value={value}
    aria-controls="{context.uid}-panel-{value}"
    aria-selected={value === context.activeValue}
    class={cnBase("font-bold", value !== context.activeValue && "text-muted-foreground")}
>
    {@render children?.()}
</Button>
