import { tv, type VariantProps } from "tailwind-variants";

export const paper = tv({
  base: "relative rounded-2xl bg-background border border-muted",
});

export type PaperVariants = VariantProps<typeof paper>;
