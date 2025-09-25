import { tv, type VariantProps } from "tailwind-variants";

export const drawer = tv({
	slots: {
		dialog: [
			"fixed flex flex-col gap-6 p-6 shadow-2xl",
			"bg-background dark:bg-[color-mix(in_oklch,var(--background),var(--foreground)_5%)]"
		],
		actions: "relative flex w-full flex-col gap-2.5 sm:flex-row sm:justify-end sm:gap-3"
	},
	variants: {
		from: {
			top: {
				dialog: "top-0 left-0 w-full"
			},
			left: {
				dialog: "top-0 left-0 h-full"
			},
			right: {
				dialog: "top-0 right-0 h-full"
			},
			bottom: {
				dialog: "bottom-0 left-0 w-full"
			}
		}
	},
	defaultVariants: {
		from: "right"
	}
});

export type DrawerVariants = VariantProps<typeof drawer>;
