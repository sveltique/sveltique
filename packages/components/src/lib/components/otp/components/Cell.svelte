<script lang="ts">
import { cnBase } from "tailwind-variants";
import type { WithRef } from "$lib/types.js";
import { getLocalContext } from "../context.svelte.js";
import { type OTPCellVariants, otpCell } from "../variants.js";
import { getSibling } from "../utils.js";

interface Props extends WithRef<HTMLElement | HTMLInputElement>, OTPCellVariants {
	/** The position of the cell in the OTP input. */
	index: number;
}

let { index, ref = $bindable(), ...restProps }: Props = $props();

const uid = $props.id();

const context = getLocalContext();

/* let parent = $state<HTMLElement>();
let isActiveCell = $state<boolean>();

onMount(() => {
	if (!ref) return;

	parent = ref.parentElement!;
});

useMutationObserver(
	() => parent,
	() => {
		isActiveCell = parent!.getAttribute("data-active-cell-id") === uid;
	},
	{ attributes: true }
);

onKeyUp(
	["Backspace", "Delete"],
	(_, key) => {
		if (!ref) return;

		if (value !== "") {
			value = "";
			onvaluechange?.("");

			return;
		}

		if (key === "Backspace" && position === "first") return;
		if (key === "Delete" && position === "last") return;

		const sibling = getSibling(ref, {
			attribute: "data-otp-cell",
			previous: key === "Backspace"
		});
		if (!sibling) return;

		parent!.setAttribute("data-active-cell-id", sibling.id);
		sibling.focus();
	},
	{ element: () => ref }
);

onKeyDown(
	["ArrowLeft", "ArrowRight"],
	(_, key) => {
		if (!ref) return;

		if (key === "ArrowLeft" && position === "first") return;
		if (key === "ArrowRight" && position === "last") return;

		const sibling = getSibling(ref, {
			attribute: "data-otp-cell",
			previous: key === "ArrowLeft"
		});
		if (!sibling) return;

		parent!.setAttribute("data-active-cell-id", sibling.id);
		sibling.focus();
	},
	{ element: () => ref }
);

function oninput(event: InputEvent & { currentTarget: HTMLInputElement }) {
	if (event.inputType === "deleteContentBackward") return;
	if (!ref) return;

	const char = event.currentTarget.value.at(-1)!;

	(ref as HTMLInputElement).value = char;
	value = char;
	onvaluechange?.(char);

	const nextCell = getSibling(ref, { attribute: "data-otp-cell", previous: false });
	if (!nextCell) return;

	parent!.setAttribute("data-active-cell-id", nextCell.id);
	nextCell.focus();
}

function onclick() {
	moveCursorAtEnd();
}

function onfocus() {
	moveCursorAtEnd();
}

function moveCursorAtEnd() {
	if (!ref) return;
	(ref as HTMLInputElement).setSelectionRange(1, 1);
} */

function oninput(event: Event & { currentTarget: HTMLInputElement }) {
	if (!ref) return;

	// @ts-ignore
	if (event.inputType === "deleteContentBackward") {
		context.value[index] = "";
		getSibling(ref, { attribute: "data-otp-cell", previous: true })?.focus();
		return;
	}

	context.value[index] = event.currentTarget.value.at(-1) ?? "";

	getSibling(ref, { attribute: "data-otp-cell", previous: false })?.focus();
}
</script>

<input
    bind:this={ref}
    bind:value={context.value[index]}
    {oninput}
    id={uid}
    type="text"
    tabindex={context.activeCellIndex === index ? 0 : -1}
    data-otp-cell
    data-index={index}
    class={cnBase(otpCell(), !!context.at(index) && "caret-transparent")}
    {...restProps}
/>
