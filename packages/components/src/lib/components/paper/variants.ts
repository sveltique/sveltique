import { tv, type VariantProps } from "tailwind-variants";

export const paper = tv({
	base: "relative rounded-large",
	variants: {
		variant: {
			outline: "bg-background border border-muted",
			elevated: ""
		},
		elevation: {
			0: "shadow-none",
			1: "shadow-sm not-dark:border not-dark:border-muted/50",
			2: "shadow-md not-dark:border not-dark:border-muted/50",
			3: "shadow-lg not-dark:border not-dark:border-muted/50",
			4: "shadow-xl not-dark:border not-dark:border-muted/50",
			5: "shadow-2xl not-dark:border not-dark:border-muted/50"
		}
	},
	compoundVariants: [
		{
			variant: "elevated",
			elevation: 0,
			class: "bg-background"
		},
		{
			variant: "elevated",
			elevation: 1,
			class: "bg-background-elevated-1"
		},
		{
			variant: "elevated",
			elevation: 2,
			class: "bg-background-elevated-2"
		},
		{
			variant: "elevated",
			elevation: 3,
			class: "bg-background-elevated-3"
		},
		{
			variant: "elevated",
			elevation: 4,
			class: "bg-background-elevated-4"
		},
		{
			variant: "elevated",
			elevation: 5,
			class: "bg-background-elevated-5"
		}
	],
	defaultVariants: {
		variant: "outline",
		elevation: 0
	}
});

export type PaperVariants = VariantProps<typeof paper>;
