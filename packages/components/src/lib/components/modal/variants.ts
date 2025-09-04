import { tv, type VariantProps } from "tailwind-variants";

export const modal = tv({
	slots: {
		dialog: [
			"fixed top-1/2 left-0 z-10 max-h-[85%] flex flex-col gap-6 p-6 w-full -translate-y-1/2 shadow-2xl z-[1000]",
			"bg-background dark:bg-[color-mix(in_oklch,var(--background),var(--foreground)_5%)] sm:left-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:rounded-large"
		],
		actions: "relative flex w-full flex-col gap-2.5 sm:flex-row sm:justify-end sm:gap-3"
	}
});

export type ModalVariants = VariantProps<typeof modal>;
