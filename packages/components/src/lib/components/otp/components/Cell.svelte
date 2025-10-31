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
</script>

<input
    bind:this={ref}
    bind:value={context.value[index]}
    {oninput}
    id={uid}
    type="text"
    {tabindex}
    data-otp-cell
    data-index={index}
    class={cnBase(otpCell(), !!context.value[index] && "caret-transparent")}
    {...restProps}
/>
