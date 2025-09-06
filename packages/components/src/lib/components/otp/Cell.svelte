<script lang="ts">
import { onMount } from "svelte";
import type { WithRef } from "$lib/types.js";
import { onKeyDown, onKeyUp } from "$utils/on-key.svelte.js";
import { useMutationObserver } from "$utils/use-mutation-observer.svelte.js";
import { getSibling } from "./utils.js";
import { type OTPCellVariants, otpCell } from "./variants.js";

interface Props extends WithRef<HTMLElement | HTMLInputElement>, OTPCellVariants {
	/** @default "middle" */
	position?: "first" | "middle" | "last";
	/** @default "" */
	value?: string;
	onvaluechange?: (value: string) => void;
}

let {
	onvaluechange,
	position = "middle",
	ref = $bindable(),
	value = "",
	...restProps
}: Props = $props();

const uid = $props.id();

let parent = $state<HTMLElement>();
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
</script>

<input
    bind:this={ref}
    oninput={(e) => {
        // @ts-ignore
        oninput(e)
    }}
    {value}
    id={uid}
    type="text"
    tabindex={isActiveCell ? 0 : -1}
    data-otp-cell
    data-position={position}
    class={otpCell({ position })}
    {...restProps}
/>
