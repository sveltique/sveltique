<script lang="ts">
import { onMount, untrack } from "svelte";
import type { WithRef } from "$lib/types.js";
import Cell from "./Cell.svelte";

interface Props extends WithRef<HTMLElement | HTMLDivElement> {
	/** @default 6 */
	length?: number;
	name?: string;
	/** @default "" */
	value?: string;
}

let { length = 6, name, ref = $bindable(), value = $bindable("") }: Props = $props();

let activeCellId = $state<string>();

let values = $state(value.padEnd(6, "").slice(0, length).split(""));
let innerCells = $derived.by(() => {
	const elements = ref?.querySelectorAll("[data-otp-cell]");

	if (!elements) return;

	const arr = Array.from(elements) as HTMLElement[];

	return arr;
});

onMount(() => {
	if (length < 2) {
		throw new Error("Cannot create an OTP with less than 2 cells.");
	}
});

onMount(() => {
	if (!innerCells) return;

	activeCellId = innerCells.at(0)?.id;
});

$effect(() => {
	values;

	untrack(() => {
		value = values.join("");
	});
});

/* const onclick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!ref) return;

	const target = event.target;
    if (!isHTMLElement(target) || !ref.contains(target) || !target.hasAttribute("data-otp-cell")) return;

	innerCells.find((el) => el.id === activeCellId)!.focus();
} */
</script>

<input type="text" {name} {value} />
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    bind:this={ref}
    role="group"
    data-otp
    data-length={length}
    data-active-cell-id={activeCellId}
    class="relative flex justify-between items-center"
>
    <Cell bind:value={() => values[0], (newV) => (values[0] = newV)} position="first" />
    {#each { length: length - 2 } as _, i}
        <Cell bind:value={() => values[i + 1], (newV) => (values[i + 1] = newV)} />
    {/each}
    <Cell bind:value={() => values[-1], (newV) => (values[-1] = newV)} position="last" />
</div>
