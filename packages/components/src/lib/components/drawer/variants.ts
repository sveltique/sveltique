import { tv, type VariantProps } from "tailwind-variants";

export const drawer = tv({
	slots: {
		dialog: [
			"fixed flex flex-col gap-12 p-6 shadow-2xl justify-between overflow-y-auto",
			"bg-background dark:bg-[color-mix(in_oklch,var(--background),var(--foreground)_5%)]"
		],
		actions: "relative flex w-full flex-col gap-2.5"
	},
	variants: {
		from: {
			top: {
				dialog: "top-0 left-0 w-full max-h-[80vh]"
			},
			left: {
				dialog: "top-0 left-0 h-full w-4/5 max-w-sm"
			},
			right: {
				dialog: "top-0 right-0 h-full w-4/5 max-w-sm"
			},
			bottom: {
				dialog: "bottom-0 left-0 w-full max-h-[80vh]"
			}
		}
	},
	defaultVariants: {
		from: "right"
	}
});

export type DrawerVariants = VariantProps<typeof drawer>;
