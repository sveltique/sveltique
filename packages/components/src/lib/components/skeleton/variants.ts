import { tv, type VariantProps } from "tailwind-variants";

export const skeleton = tv({
	base: "rounded-large bg-muted",
	variants: {
		animation: {
			pulse: "animate-pulse",
			none: ""
		}
	},
	defaultVariants: {
		animation: "pulse"
	}
});

export type SkeletonVariants = VariantProps<typeof skeleton>;
