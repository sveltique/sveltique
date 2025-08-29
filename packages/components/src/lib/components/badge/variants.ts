import { tv, type VariantProps } from "tailwind-variants";

export const badge = tv({
	base: "relative shrink-0 w-fit font-medium inline-flex gap-1 overflow-hidden whitespace-nowrap items-center justify-center rounded px-2 py-1 text-xs",
	variants: {
		variant: {
			contained: "bg-primary text-primary-foreground",
			outline: "bg-background text-foreground border border-muted",
			danger: "bg-danger text-white"
		},
		number: {
			true: "rounded-full"
		}
	},
	defaultVariants: {
		variant: "contained",
		number: false
	}
});

export type BadgeVariants = VariantProps<typeof badge>;
