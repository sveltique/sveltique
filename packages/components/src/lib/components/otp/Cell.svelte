<script lang="ts">
import { onMount } from "svelte";
import type { FormEventHandler } from "svelte/elements";
import type { WithRef } from "$lib/types.js";
import { onKeyDown, onKeyUp } from "$utils/on-key.svelte.js";
import { useMutationObserver } from "$utils/use-mutation-observer.svelte.js";
import { type OTPCellVariants, otpCell } from "./variants.js";
import { getSibling } from "./utils.js";

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
	value = $bindable(),
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

onKeyDown(
	"Backspace",
	() => {
		if (!ref) return;

		if (value !== "") {
			onvaluechange?.("");
		}

		if (position !== "first") {
			const previousCell = ref.previousElementSibling as HTMLElement;
			previousCell.focus();
		}
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
		sibling?.focus();
	},
	{ element: () => ref }
);

function oninput(event: InputEvent & { currentTarget: HTMLInputElement }) {
	if (event.inputType === "deleteContentBackward") return;
	if (!ref) return;
	if (position === "last" || !ref.nextElementSibling) return;

	value = event.currentTarget.value;

	onvaluechange?.(event.currentTarget.value);

	const nextCell = ref.nextElementSibling as HTMLElement;

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
    inputmode="numeric"
    pattern="[0-9]*"
    maxlength={1}
    tabindex={isActiveCell ? 0 : -1}
    data-otp-cell
    data-position={position}
    class={otpCell({ position })}
    {...restProps}
/>
