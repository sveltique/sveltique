import type { HTMLAnchorAttributes } from "svelte/elements";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import type { ButtonVariants } from "../button/variants.js";

export interface PaginationItemProps
	extends ReplaceWithTWMergeClass<HTMLAnchorAttributes>,
		WithRef<HTMLAnchorElement> {
	/**
	 * Additional properties to customize the button's styles.
	 * @default {}
	 */
	buttonVariants?: ButtonVariants;
	/**
	 * Whether the current item is active or not.
	 * @default false
	 */
	isActive?: boolean;
}
