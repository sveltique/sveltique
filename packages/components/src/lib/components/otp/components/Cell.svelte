<script lang="ts">
import { cnBase } from "tailwind-variants";
import type { WithRef } from "$lib/types.js";
import { getLocalContext } from "../context.svelte.js";
import { type OTPCellVariants, otpCell } from "../variants.js";
import { getSibling } from "../utils.js";
import { onKeyDown } from "$utils/on-key.svelte.js";

interface Props extends WithRef<HTMLElement | HTMLInputElement>, OTPCellVariants {
	/** The position of the cell in the OTP input. */
	index: number;
}

let { index, ref = $bindable(), ...restProps }: Props = $props();

const uid = $props.id();

const context = getLocalContext();

let tabindex = $derived.by(() => {
	const firstEmptyChar = context.value.findIndex((v) => v === "");

	if (firstEmptyChar === -1) {
		return index === context.length - 1 ? 0 : -1;
	}

	return index === firstEmptyChar ? 0 : -1;
});

/* let parent = $state<HTMLElement>();
let isActiveCell = $state<boolean>();

onMount(() => {
	if (!ref) return;

	parent = ref.parentElement!;
}); */

onKeyDown(
	["Backspace", "Delete"],
	(_, key) => {
		if (!ref) return;

		if (key === "Backspace") {
			if (context.value[index] === "") {
				getSibling(ref, { attribute: "data-otp-cell", previous: true })?.focus();
			} else {
				context.value[index] = "";
			}

			return;
		}

		/* if (key === "Delete" && position === "last") return;

		const sibling = getSibling(ref, {
			attribute: "data-otp-cell",
			previous: key === "Backspace"
		});
		if (!sibling) return;

		parent!.setAttribute("data-active-cell-id", sibling.id);
		sibling.focus(); */
	},
	{ element: () => ref }
);

onKeyDown(
	["ArrowLeft", "ArrowRight"],
	(_, key) => {
		if (!ref) return;

		if (key === "ArrowRight" && context.value[index] === "") return;

		getSibling(ref, {
			attribute: "data-otp-cell",
			previous: key === "ArrowLeft"
		})?.focus();
	},
	{ element: () => ref }
);

function oninput(event: Event & { currentTarget: HTMLInputElement }) {
	if (!ref) return;
	if ("inputType" in event && event.inputType === "deleteContentBackward") return;

	if (!("data" in event)) return;

	context.value[index] = event.data as string;
	getSibling(ref, { attribute: "data-otp-cell", previous: false })?.focus();
}

function onpaste(event: ClipboardEvent) {
	if (!context.root) return;

	event.preventDefault();

	const chars = (event.clipboardData?.getData("text") ?? "").split("");

	context.value[index] = chars[0] ?? "";

	let finalIndex = index + 1;
	for (let i = 1; i < chars.length; i++) {
		if (context.value[finalIndex] !== "") break;

		context.value[finalIndex] = chars[i];
		finalIndex++;
	}

	const children = Array.from(context.root.children) as HTMLElement[];
	const element = children.find((child) => {
		return (
			child.getAttribute("data-otp-cell") === "true" &&
			child.getAttribute("data-index") === String(Math.min(finalIndex, context.length - 1))
		);
	});

	element?.focus();
}
</script>

<input
    bind:this={ref}
    bind:value={context.value[index]}
    {oninput}
    {onpaste}
    id={uid}
    type="text"
    {tabindex}
    data-otp-cell
    data-index={index}
    class={cnBase(otpCell(), !!context.value[index] && "caret-transparent")}
    {...restProps}
/>
