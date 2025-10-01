import { tv, type VariantProps } from "tailwind-variants";

export const field = tv({
	slots: {
		container: "relative w-full flex flex-col items-start gap-3",
		labelInputContainer: "relative w-full flex",
		error: "text-sm text-danger flex gap-3 items-center",
		helper: "text-sm text-muted-foreground flex gap-3 items-center",
		icon: "h-5 aspect-square shrink-0"
	},
	variants: {
		placement: {
			top: {
				labelInputContainer: "flex-col items-start justify-start gap-3"
			},
			left: {
				labelInputContainer: "flex-row items-center justify-start gap-3"
			},
			right: {
				labelInputContainer: "flex-row-reverse items-center justify-end gap-3"
			}
		}
	},
	defaultVariants: {
		placement: "top"
	}
});

export type FieldVariants = VariantProps<typeof field>;
