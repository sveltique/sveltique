<script lang="ts">
import type { HTMLImgAttributes } from "svelte/elements";
import { cnBase } from "tailwind-variants";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";

export interface AvatarImageProps
	extends ReplaceWithTWMergeClass<HTMLImgAttributes>,
		WithRef<HTMLImageElement> {}

let { class: className, ...restProps }: AvatarImageProps = $props();
</script>

<img data-avatar-image class={cnBase(className)} {...restProps} />
