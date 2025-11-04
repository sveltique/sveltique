import { tv, type VariantProps } from "tailwind-variants";

export const radioGroup = {
    root: tv({}),
    item: tv({
        base: [
            "checked:bg-primary",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary",
        ],
    }),
};

export type RadioGroupVariants = VariantProps<typeof radioGroup.root>;
export type RadioGroupItemVariants = VariantProps<typeof radioGroup.item>;
