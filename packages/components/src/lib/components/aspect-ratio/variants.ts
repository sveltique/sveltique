import { tv, type VariantProps } from "tailwind-variants";

export const aspectRatio = tv({
	base: "overflow-hidden"
});

export type AspectRatioVariants = VariantProps<typeof aspectRatio>;
