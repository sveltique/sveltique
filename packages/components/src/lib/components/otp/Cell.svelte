<script lang="ts">
import { onMount } from "svelte";
import type { FormEventHandler } from "svelte/elements";
import type { WithRef } from "$lib/types.js";
import { onKeyDown, onKeyUp } from "$utils/on-key.svelte.js";
import { useMutationObserver } from "$utils/use-mutation-observer.svelte.js";
import { type OTPCellVariants, otpCell } from "./variants.js";

interface Props extends WithRef<HTMLElement | HTMLInputElement>, OTPCellVariants {
	/** @default "middle" */
	position?: "first" | "middle" | "last";
	/** @default "" */
	value?: string;
}

let { position = "middle", ref = $bindable(), value = $bindable(), ...restProps }: Props = $props();

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
	"Backspace",
	() => {
		if (!ref) return;

		if (value !== "") {
			(ref as HTMLInputElement).value = "";
		} else if (position !== "first") {
			const previousCell = ref.previousElementSibling as HTMLElement;
			previousCell.focus();
		}
	},
	{ element: () => ref }
);

const oninput: FormEventHandler<HTMLInputElement> = (event) => {
	if (!ref) return;
	if (position === "last" || !ref.nextElementSibling) return;

	value = event.currentTarget.value;

	const nextCell = ref.nextElementSibling as HTMLElement;
	nextCell.focus();
};
</script>

<input
    bind:this={ref}
    {oninput}
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
