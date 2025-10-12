import { tv, type VariantProps } from "tailwind-variants";

export const fileInput = tv({
  base: [
    "relative h-11 w-full rounded-2xl text-sm border border-muted",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background",
  ],
  variants: {
    disabled: {
      true: "disabled:cursor-not-allowed disabled:opacity-50",
    },
  },
});

export type FileInputVariants = VariantProps<typeof fileInput>;
