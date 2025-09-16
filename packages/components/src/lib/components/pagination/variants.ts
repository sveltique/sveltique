import { tv } from "tailwind-variants";

export const pagination = {
	root: tv({
		base: "relative flex items-center justify-center gap-3 list-none"
	}),
	previous: tv({
		slots: {
			icon: "h-5 aspect-square shrink-0"
		},
		variants: {
			containsText: {
				true: {
					icon: "-ml-1"
				}
			}
		},
		defaultVariants: {
			containsText: false
		}
	}),
	next: tv({
		slots: {
			container: "flex-row-reverse",
			icon: "h-5 aspect-square shrink-0"
		},
		variants: {
			containsText: {
				true: {
					icon: "-mr-1"
				}
			}
		},
		defaultVariants: {
			containsText: false
		}
	}),
	ellipsis: tv({
		slots: {
			container: "size-9 p-2",
			icon: "h-5 aspect-square shrink-0"
		}
	})
};
