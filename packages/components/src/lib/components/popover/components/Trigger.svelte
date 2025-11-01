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

function onTriggerClick() {
	context.open = !context.open;
}

onMount(() => {
	if (!ref) return;

	context.triggerRef = ref;
});
</script>

<Button bind:ref onclick={onTriggerClick} {variant} data-popover-trigger {...restProps}>
    {@render children?.()}
</Button>
