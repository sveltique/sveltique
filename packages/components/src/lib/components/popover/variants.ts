import { tv, type VariantProps } from "tailwind-variants";

export const popover = tv({});

export const popoverContent = tv({
    base: "absolute top-0 left-0 w-max text-foreground border border-muted shadow-sm bg-background rounded-lg p-4",
});

export type PopoverVariants = VariantProps<typeof popover>;
export type PopoverContentVariants = VariantProps<typeof popoverContent>;
