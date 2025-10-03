<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { $$component:camel-case, type $$component:pascal-caseVariants } from "./variants.js";

export interface $$component:pascal-caseProps
    extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
        WithRef<HTMLDivElement>,
        $$component:pascal-caseVariants {
	/**
	 * The children content to render.
	 * @default —
	 */
	children?: Snippet;
}

let { children, class: className, ref = $bindable(), ...restProps }: $$component:pascal-caseProps = $props();
</script>

<!--
@component
TODO : Explain what $$component:pascal-case does
@see https://sveltique.dev/docs/components/browse/$$component:kebab-case.svelte
-->

<div
    bind:this={ref}
    class={$$component:camel-case({ className })}
    {...restProps}
>
    {@render children?.()}
</div>
