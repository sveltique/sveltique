import { tv, type VariantProps } from "tailwind-variants";

/** The styles of a button. */
export const button = tv({
	base: [
		"relative duration-150 ease-in-out flex justify-center items-center gap-2.5 cursor-pointer [&_*]:pointer-events-none",
		"focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-offset-2"
	],
	variants: {
		variant: {
			contained: "",
			outline: "border border-solid font-medium",
			text: ""
		},
		shape: {
			rectangle: "rounded-lg",
			square: "rounded-2xl"
		},
		size: {
			small: "text-sm px-3 py-1.5",
			medium: "px-4 py-2",
			large: "text-lg px-6 py-3"
		},
		disabled: {
			true: "cursor-not-allowed opacity-50" // TODO : add custom disabled color on each button...
		},
		color: {
			primary: "focus:ring-primary",
			danger: "focus:ring-danger"
		}
	},
	compoundVariants: [
		{
			shape: "rectangle",
			size: "small",
			class: "rounded-sm"
		},
		{
			shape: "square",
			size: "small",
			class: "p-1 rounded-sm"
		},
		{
			shape: "square",
			size: "medium",
			class: "p-2 rounded-lg"
		},
		{
			shape: "square",
			size: "large",
			class: "p-3 rounded-2xl"
		},
		{
			variant: "contained",
			color: "primary",
			class: "bg-primary text-primary-foreground not-disabled:hover:bg-primary-muted"
		},
		{
			variant: "outline",
			color: "primary",
			class: "bg-transparent text-foreground not-disabled:hover:bg-muted border-muted"
		},
		{
			variant: "text",
			color: "primary",
			class: "bg-transparent text-foreground not-disabled:hover:bg-muted"
		},
		{
			variant: "contained",
			color: "danger",
			class: "bg-danger text-white not-disabled:hover:bg-danger-muted"
		},
		{
			variant: "outline",
			color: "danger",
			class: "bg-transparent text-danger border border-muted not-disabled:hover:bg-muted"
		},
		{
			variant: "text",
			color: "danger",
			class: "bg-transparent text-danger not-disabled:hover:bg-muted"
		}
	],
	defaultVariants: {
		size: "medium",
		variant: "contained",
		shape: "rectangle",
		color: "primary",
		disabled: false
	}
});

export type ButtonVariants = VariantProps<typeof button>;
