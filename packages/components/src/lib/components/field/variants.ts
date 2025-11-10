import { tv, type VariantProps } from "tailwind-variants";

export const field = tv({
    base: "relative w-full flex items-start justify-start gap-3",
    variants: {
        orientation: {
            vertical: "flex-col",
            horizontal: "flex-row",
        },
    },
    defaultVariants: {
        orientation: "vertical",
    },
});

export const fieldHelper = tv({
    base: "text-sm text-muted-foreground flex gap-3 items-center",
});

export const fieldError = tv({
    base: ["text-sm text-danger flex gap-3 items-start", "[&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0"],
});

export type FieldVariants = VariantProps<typeof field>;
