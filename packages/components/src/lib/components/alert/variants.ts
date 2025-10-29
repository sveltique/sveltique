import { tv, type VariantProps } from "tailwind-variants";

export const alert = tv({
    base: [
        "relative flex w-full items-center gap-4 rounded-lg p-4 text-foreground text-sm font-medium",
        "[&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0"
    ],
    variants: {
        type: {
            success: "bg-success-light",
            warning: "bg-warning-light",
            info: "bg-info-light",
            danger: "bg-danger-light",
        },
    },
});

export type AlertVariants = VariantProps<typeof alert>;
