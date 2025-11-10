<script module lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Ref, TWMergeClass } from "$lib/types.js";

type HTMLContentAttributes = HTMLAttributes<HTMLDivElement> & TWMergeClass;

export interface FieldContentProps extends HTMLContentAttributes, Ref<HTMLDivElement> {}
</script>

<script lang="ts">
let { children, ref = $bindable() }: FieldContentProps = $props();
</script>

<div bind:this={ref} data-field-content class="flex flex-col gap-1.5">
    {@render children?.()}
</div>
