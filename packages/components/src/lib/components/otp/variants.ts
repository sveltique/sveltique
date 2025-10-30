import { tv, type VariantProps } from "tailwind-variants";

export const otpCell = tv({
	base: [
		"w-10 h-14 border border-muted bg-background text-foreground",
		"focus:outline-none focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
	],
	variants: {
		position: {
			first: "rounded-l-large",
			middle: "",
			last: "rounded-r-large"
		}
	},
	defaultVariants: {
		position: "middle"
	}
});

export type OTPCellVariants = VariantProps<typeof otpCell>;
