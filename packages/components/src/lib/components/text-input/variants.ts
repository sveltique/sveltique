import { tv, type VariantProps } from "tailwind-variants";

export const textInput = tv({
	base: [
		"relative h-11 w-full rounded-2xl border border-muted bg-transparent px-4 text-sm",
		"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background"
	]
});

export type TextInputVariants = VariantProps<typeof textInput>;
