<script lang="ts">
import { flushSync, onMount } from "svelte";
import type { WithRef } from "$lib/types.js";
import Cell from "./Cell.svelte";
import type { MouseEventHandler } from "svelte/elements";
import { isHTMLElement } from "$utils/is-html-element.js";

interface Props extends WithRef<HTMLElement | HTMLDivElement> {
	/** @default 6 */
	length?: number;
	name?: string;
	/** @default "" */
	value?: string;
}

let { length = 6, name, ref = $bindable(), value = $bindable("") }: Props = $props();

let activeCellId = $state<string>("");
let values = $derived(toCharArray(value, length));

onMount(() => {
	if (length < 2) {
		throw new Error("Cannot create an OTP with less than 2 cells.");
	}
});

onMount(() => {
	if (!ref) return;

	const children = Array.from(ref.children);
	const firstCell = children.find((element) => element.getAttribute("data-otp-cell"));

	activeCellId = firstCell?.id ?? "";
});

function toCharArray(str: string, len: number): string[] {
	const chars = str.split("");
	const minLengthChars = chars.concat(Array(len).fill(""));

	return minLengthChars.slice(0, length);
}

const onclick: MouseEventHandler<HTMLDivElement> = (event) => {
	if (!ref) return;

	const target = event.target;
	if (!isHTMLElement(target) || !ref.contains(target) || !target.hasAttribute("data-otp-cell")) {
		return;
	}

	activeCellId = target.id;
};

function onpaste(event: ClipboardEvent) {
	event.preventDefault();

	// @ts-ignore
	const data = (event.clipboardData || window.clipboardData).getData("text") as string;

	values = toCharArray(data, length);
}

function onvaluechange(index: number, newValue: string) {
	let _tempValues = structuredClone(values);

	console.log("before", _tempValues);

	_tempValues[index] = newValue;
	value = _tempValues.map((v) => (v !== "" ? v : " ")).join("");
	values = _tempValues;

	console.log("after", _tempValues);

	flushSync();
}
</script>

<input type="text" {name} {value} aria-hidden="true" class="hidden" />
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    bind:this={ref}
    {onclick}
    {onpaste}
    role="group"
    data-otp
    data-length={length}
    data-active-cell-id={activeCellId}
    class="relative flex justify-between items-center"
>
    <Cell value={values[0]} onvaluechange={(v) => onvaluechange(0, v)} position="first" />
    {#each { length: length - 2 } as _, i}
        <Cell value={values[i + 1]} onvaluechange={(v) => onvaluechange(i + 1, v)} />
    {/each}
    <Cell value={values[length - 1]} onvaluechange={(v) => onvaluechange(length - 1, v)} position="last" />
</div>
