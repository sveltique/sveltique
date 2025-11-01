<script lang="ts">
import { onMount } from "svelte";
import type { ButtonProps } from "$lib/components/button/Button.svelte";
import { Button } from "$lib/components/button/index.js";
import { getLocalContext } from "../context.svelte.js";

export interface PopoverTriggerProps extends ButtonProps {}

let {
	children,
	ref = $bindable(),
	variant = "outline",
	...restProps
}: PopoverTriggerProps = $props();

const context = getLocalContext();

onMount(() => {
	if (!ref) return;

	context.triggerRef = ref;
});

function onTriggerClick() {
	context.open = !context.open;
}
</script>

<Button
    bind:ref
    onclick={onTriggerClick}
    id="{context.id}-trigger"
    {variant}
    aria-haspopup="dialog"
    aria-expanded={context.open}
    aria-controls="{context.id}-content"
    data-popover-trigger
    data-open={context.open}
    {...restProps}
>
    {@render children?.()}
</Button>
