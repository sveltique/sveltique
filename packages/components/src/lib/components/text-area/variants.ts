import { tv, type VariantProps } from "tailwind-variants";

export const textArea = tv({
	base: [
		"relative w-full rounded-large border border-muted bg-transparent p-4 text-sm",
		"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background"
	]
});

export type TextAreaVariants = VariantProps<typeof textArea>;
