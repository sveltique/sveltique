import { tv, type VariantProps } from "tailwind-variants";

export const link = tv({
	slots: {
		container: "text-primary inline-flex gap-1",
		icon: "aspect-square w-5 shrink-0"
	},
	variants: {
		underline: {
			always: {
				container: "underline"
			},
			hover: {
				container: "hover:underline"
			},
			none: {
				container: ""
			}
		}
	},
	defaultVariants: {
		underline: "always"
	}
});

export type LinkVariants = VariantProps<typeof link>;
