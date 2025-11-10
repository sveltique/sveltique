<script module lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Ref, TWMergeClass } from "$lib/types.js";
import { fieldHelper } from "../variants.js";

type HTMLHelperAttributes = HTMLAttributes<HTMLParagraphElement> & TWMergeClass;

export interface FieldHelperProps extends HTMLHelperAttributes, Ref<HTMLParagraphElement> {}
</script>

<script lang="ts">
let { class: className, children, ref = $bindable(), ...restProps }: FieldHelperProps = $props();
</script>

<p bind:this={ref} role="note" data-field-helper class={fieldHelper({ className })} {...restProps}>
    {@render children?.()}
</p>
