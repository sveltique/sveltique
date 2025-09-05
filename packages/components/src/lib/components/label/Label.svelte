<script lang="ts">
import type { HTMLLabelAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass } from "$lib/types.js";
import { type LabelVariants, label } from "./variants.js";

export interface LabelProps extends ReplaceWithTWMergeClass<HTMLLabelAttributes>, LabelVariants {}

let { children, class: className, ...restProps }: LabelProps = $props();
</script>

<label data-label class={label({ className })} {...restProps}>
    {@render children?.()}
</label>
