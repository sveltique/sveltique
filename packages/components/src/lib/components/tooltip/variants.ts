import { tv, type VariantProps } from "tailwind-variants";

export const tooltip = tv({
    slots: {
        container: "absolute top-0 left-0 w-max text-background whitespace-nowrap bg-foreground rounded-sm p-2 text-xs",
        arrow: "absolute bg-foreground size-2 rotate-45 rounded-xs",
    }
});

export type TooltipVariants = VariantProps<typeof tooltip>;
