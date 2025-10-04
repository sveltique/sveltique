import { tv, type VariantProps } from "tailwind-variants";

export const scrollable = tv({
	base: "overflow-auto"
});

export type ScrollableVariants = VariantProps<typeof scrollable>;
