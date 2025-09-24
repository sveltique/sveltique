<script lang="ts">
import { type Snippet, untrack } from "svelte";
import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { getImageStatus, loadImage } from "./utils.js";
import { avatar } from "./variants.js";

type Status = "idle" | "loading" | "ready" | "error";

export interface AvatarProps
	extends ReplaceWithTWMergeClass<HTMLImgAttributes>,
		WithRef<HTMLDivElement> {
	/**
	 * The fallback to render while the avatar is loading or failed to load.
	 *
	 * Takes precedence over `fallback`.
	 * @default —
	 */
	children?: Snippet;
	/**
	 * Additional properties to customize root container.
	 * @default {}
	 */
	containerProps?: ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>;
	/**
	 * The fallback to render while the avatar is loading or failed to load.
	 * @default ""
	 */
	fallback?: string;
	/**
	 * The underlying DOM element of the image.
	 * @bindable
	 * @default —
	 */
	imageRef?: HTMLImageElement;
}

let {
	children,
	class: className,
	containerProps = {},
	crossorigin = null,
	fallback = "",
	imageRef = $bindable(),
	ref = $bindable(),
	referrerpolicy = null,
	src,
	srcset = null,
	...restProps
}: AvatarProps = $props();

let { class: containerClass, ...restContainerProps } = $derived(containerProps);

let status = $derived<Status>(getImageStatus(imageRef, src));
let { container, image } = $derived(avatar());

$effect(() => {
	src;
	srcset;

	if (imageRef && src && imageRef.src !== src) {
		imageRef.src = src;
	}

	if (!src) return;

	untrack(() => {
		loadImage((newStatus) => (status = newStatus), {
			src,
			srcset,
			crossOrigin: crossorigin,
			referrerPolicy: referrerpolicy
		});
	});
});
</script>

<div
    bind:this={ref}
    data-avatar
    data-status={status}
    class={container({ class: containerClass })}
    {...restContainerProps}
>
    {#if src && status === "ready"}
        <img
            bind:this={imageRef}
            data-avatar-image
            {src}
            {srcset}
            {crossorigin}
            {referrerpolicy}
            class={image({ className })}
            {...restProps}
        />
    {:else if children}
        {@render children?.()}
    {:else}
        <span data-avatar-fallback>{fallback}</span>
    {/if}
</div>
