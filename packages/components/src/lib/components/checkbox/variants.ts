import { tv, type VariantProps } from "tailwind-variants";

export const checkbox = tv({
    base: [
        "relative cursor-pointer rounded-sm border-2 bg-background border-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary",
    ],
    variants: {
        checked: {
            true: "border-none bg-primary",
        },
        disabled: {
            true: "border-muted cursor-not-allowed",
        },
    },
    compoundVariants: [
        {
            checked: true,
            disabled: true,
            class: "bg-primary-disabled",
        },
    ],
});

export type CheckboxVariants = VariantProps<typeof checkbox>;
