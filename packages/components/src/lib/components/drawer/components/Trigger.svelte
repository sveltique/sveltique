<script lang="ts">
import { onMount } from "svelte";
import type { MouseEventHandler } from "svelte/elements";
import { Button, type ButtonProps } from "$lib/components/button/index.js";
import { getLocalContext } from "../context.svelte.js";

export interface DrawerTriggerProps extends ButtonProps {}

let { children, onclick, ref = $bindable(), ...restProps }: DrawerTriggerProps = $props();

const context = getLocalContext();

onMount(() => {
	if (!ref) return;

	context.triggerRef = ref;
});

const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
	context.open = true;
	onclick?.(event);
};
</script>

<Button bind:ref={ref} onclick={onClick} {...restProps}>
    {@render children?.()}
</Button>
