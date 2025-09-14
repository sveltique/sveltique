<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { type ProgressVariants, progress } from "./variants.js";

export interface ProgressProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		ProgressVariants,
		WithRef<HTMLDivElement> {
	value: number;
}

let {
	class: className,
	ref = $bindable(),
	transition = true,
	value,
	...restProps
}: ProgressProps = $props();

let { fill, track } = $derived(progress({ transition }));
</script>

<!--
@component
A visual indicator of progress toward completing a task or reaching a limit, such as file uploads, onboarding steps, or usage quotas.
@see https://sveltique.dev/docs/components/browse/progress
-->

<div
    bind:this={ref}
    role="progressbar"
    data-progress
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    class={track({ className })}
    {...restProps}
>
	<div data-progress-fill style="transform: translateX({value}%);" class={fill()}></div>
</div>
