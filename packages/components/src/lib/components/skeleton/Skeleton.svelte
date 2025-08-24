<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass } from "$lib/types.js";
import { type SkeletonVariants, skeleton } from "./variants.js";

interface Props extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>, SkeletonVariants {}

let { animation = "pulse", class: className, ...restProps }: Props = $props();
</script>

<!--
@component
A placeholder component to display while the content is loading.
-->

<div class={skeleton({ animation, className })} aria-hidden="true" {...restProps}></div>
