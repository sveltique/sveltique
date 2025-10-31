<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { setLocalContext } from "../context.svelte.js";
import { otp } from "../variants.js";

interface Props
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLElement>>,
		WithRef<HTMLElement | HTMLDivElement> {
	/** The length of the OTP input. */
	length: number;
	/**
	 * The name of the hidden input.
	 * @default
	 */
	name?: string;
	/** @default "" */
	value?: string;
}

let {
	children,
	class: className,
	length,
	name,
	ref = $bindable(),
	value = $bindable(""),
	...restProps
}: Props = $props();

const context = setLocalContext(() => {
	return {
		length,
		value: toCharArray(value, length),
		setValue: (newValue: string) => (value = newValue)
	};
});

/* onMount(() => {
	if (length < 2) {
		throw new Error("Cannot create an OTP with less than 2 cells.");
	}
}); */

/* onMount(() => {
	if (!ref) return;

	const children = Array.from(ref.children);
	const firstCell = children.find((element) => element.getAttribute("data-otp-cell"));

	activeCellId = firstCell?.id ?? "";
}); */

function toCharArray(str: string, len: number): string[] {
	const chars = str.split("");
	const minLengthChars = chars.concat(Array(len).fill(""));

	return minLengthChars.slice(0, len);
}

/* const onclick: MouseEventHandler<HTMLDivElement> = (event) => {
	if (!ref) return;

	const target = event.target;
	if (!isHTMLElement(target) || !ref.contains(target) || !target.hasAttribute("data-otp-cell")) {
		return;
	}

	activeCellId = target.id;
}; */

/** Pastes the latest clipboard value in the cells. */
/* function onpaste(event: ClipboardEvent): void {
	event.preventDefault();

	const data = event.clipboardData?.getData("text") ?? "";

	const _tempValues = toCharArray(data, length);

	values = _tempValues;
	value = _tempValues.join("");
} */

/** Updates a cell at the given index. */
/* function onvaluechange(index: number, newValue: string): void {
	const _tempValues = structuredClone(values);
	_tempValues[index] = newValue;

	values = _tempValues;
	value = _tempValues.join("");
} */
</script>

<input type="text" {name} {value} aria-hidden="true" class="hidden" />
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    bind:this={ref}
    role="group"
    data-otp-root
    data-length={context.length}
    data-value={context.value}
    class={otp({ className })}
    {...restProps}
>
    {@render children?.()}
</div>
