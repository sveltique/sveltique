<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { TWMergeClass, WithRef } from "$lib/types.js";
import { type RadioGroupVariants, radioGroup } from "../variants.js";
import { RadioGroupContext, setLocalContext } from "../context.svelte.js";

type HTMLRadioGroupAttributes = HTMLAttributes<HTMLDivElement> & TWMergeClass;
type HTMLRadioGroupRef = WithRef<HTMLDivElement>;

export interface RadioGroupProps
	extends HTMLRadioGroupAttributes,
		HTMLRadioGroupRef,
		RadioGroupVariants {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
	/** The name for the radio items. */
	name: string;
	/**
	 * The default value of the radio group.
	 * @bindable
	 * @default ""
	 */
	value?: string;
}

let {
	children,
	class: className,
	name,
	ref = $bindable(),
	value = $bindable(""),
	...restProps
}: RadioGroupProps = $props();

setLocalContext(
	new RadioGroupContext(
		() => name,
		() => value,
		(newValue) => (value = newValue)
	)
);
</script>

<div
    bind:this={ref}
    role="radiogroup"
    data-radio-group-root
    data-value={value}
    class={radioGroup.root({ className })}
    {...restProps}
>
    {@render children?.()}
</div>
