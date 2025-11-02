import { tv, type VariantProps } from "tailwind-variants";

export const paper = tv({
    base: "relative rounded-2xl bg-background",
    variants: {
        variant: {
            outline: "border border-muted",
            elevated: "",
        },
        elevation: {
            0: "",
            1: "",
            2: "",
            3: "",
        },
    },
    compoundVariants: [
        {
            elevation: [1, 2, 3],
            variant: "elevated",
            class: "not-dark:border not-dark:border-muted/50",
        },
        {
            elevation: 0,
            variant: "elevated",
            class: "shadow-none",
        },
        {
            elevation: 1,
            variant: "elevated",
            class: "shadow-sm dark:bg-background-soft",
        },
        {
            elevation: 2,
            variant: "elevated",
            class: "shadow-md dark:bg-background-softer",
        },
        {
            elevation: 3,
            variant: "elevated",
            class: "shadow-lg dark:bg-background-softest",
        },
    ],
    defaultVariants: {
        variant: "outline",
        elevation: 1,
    },
});

export type PaperVariants = VariantProps<typeof paper>;
