<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type PopoverVariants, popover } from "../variants.js";
import { PopoverContext, setLocalContext } from "../context.svelte.js";

export interface PopoverProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		PopoverVariants {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/**
	 * Whether the popover content is open or not.
	 * @bindable
	 * @default false
	 */
	open?: boolean;
}

let {
	children,
	class: className,
	open = $bindable(false),
	ref = $bindable(),
	...restProps
}: PopoverProps = $props();

const context = setLocalContext(new PopoverContext(() => open));
</script>

<!--
@component
TODO : Explain what Popover does
@see https://sveltique.dev/docs/components/browse/popover.svelte
-->

{@render children?.()}
