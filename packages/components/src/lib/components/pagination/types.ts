import type { HTMLAnchorAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import type { ButtonVariants } from "../button/variants.js";

export interface PaginationItemProps
	extends ReplaceWithTWMergeClass<HTMLAnchorAttributes>,
		WithRef<HTMLAnchorElement> {
	/** Customize the underlying button's styles. */
	buttonVariants?: ButtonVariants;
	/** @default false */
	isActive?: boolean;
}
