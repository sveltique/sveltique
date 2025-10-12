import { tv, type VariantProps } from "tailwind-variants";

export const kbd = tv({
  base: "rounded-sm border border-muted-foreground bg-muted px-2 py-1 text-xs font-bold",
});

export type KbdVariants = VariantProps<typeof kbd>;
