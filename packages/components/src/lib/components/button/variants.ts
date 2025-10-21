import { tv, type VariantProps } from "tailwind-variants";

/** The styles of a button. */
export const button = tv({
    base: [
        "relative duration-150 ease-in-out flex justify-center items-center gap-2.5 cursor-pointer [&_*]:pointer-events-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
    ],
    variants: {
        variant: {
            contained: "bg-primary text-primary-foreground not-disabled:hover:bg-primary-muted focus-visible:ring-primary",
            outline: "bg-transparent text-foreground not-disabled:hover:bg-muted border-muted border border-solid focus-visible:ring-primary",
            text: "bg-transparent text-foreground not-disabled:hover:bg-muted focus-visible:ring-primary",
            danger: "bg-danger text-white not-disabled:hover:bg-danger-muted focus-visible:ring-danger"
        },
        shape: {
            rectangle: "",
            square: "",
        },
        size: {
            small: "text-xs",
            medium: "text-sm",
        },
        fullWidth: {
            true: "w-full"
        },
    },
    compoundVariants: [
        {
            shape: "rectangle",
            size: "small",
            class: "rounded-sm px-3 py-1.5 h-8",
        },
        {
            shape: "rectangle",
            size: "medium",
            class: "rounded-lg px-4 py-2 h-9",
        },
        {
            shape: "square",
            size: "small",
            class: "p-1 rounded-sm size-8",
        },
        {
            shape: "square",
            size: "medium",
            class: "p-2 rounded-lg size-9",
        }
    ],
    defaultVariants: {
        size: "medium",
        variant: "contained",
        shape: "rectangle"
    },
});

export type ButtonVariants = VariantProps<typeof button>;
