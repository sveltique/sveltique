import { tv, type VariantProps } from "tailwind-variants";

export const paper = tv({
	base: "relative rounded-large bg-background border border-muted"
});

export type PaperVariants = VariantProps<typeof paper>;
