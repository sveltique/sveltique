import { tv, type VariantProps } from "tailwind-variants";

export const progress = tv({
	slots: {
		track: "relative h-3 w-full overflow-hidden rounded-full bg-muted",
		fill: "absolute -left-full h-full w-full rounded-full bg-primary"
	},
	variants: {
		transition: {
			true: {
				fill: "duration-250"
			}
		}
	}
});

export type ProgressVariants = VariantProps<typeof progress>;
