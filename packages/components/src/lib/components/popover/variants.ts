import { tv, type VariantProps } from "tailwind-variants";

export const popoverContent = tv({
    base: [
        "absolute top-0 left-0 w-max text-foreground rounded-lg p-6",
        "focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none focus:ring-offset-background",
    ],
});

export const popoverArrow = tv({
    base: "absolute bg-inherit not-dark:border rounded-xs size-2 rotate-45",
});

export const popoverClose = tv({
    base: "absolute top-3 right-3",
});

export type PopoverContentVariants = VariantProps<typeof popoverContent>;
export type PopoverArrowVariants = VariantProps<typeof popoverArrow>;
export type PopoverCloseVariants = VariantProps<typeof popoverClose>;
