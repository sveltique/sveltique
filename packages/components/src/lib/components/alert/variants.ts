import { tv, type VariantProps } from "tailwind-variants";

export const alert = tv({
	slots: {
		container: "relative flex w-full items-center gap-5 rounded-2xl p-5 text-foreground",
		icon: "min-h-6 min-w-6"
	},
	variants: {
		type: {
			success: {
				container: "bg-success-light",
				icon: "text-success"
			},
			warning: {
				container: "bg-warning-light",
				icon: "text-warning"
			},
			info: {
				container: "bg-info-light",
				icon: "text-info"
			},
			danger: {
				container: "bg-danger-light",
				icon: "text-danger"
			}
		}
	}
});

export type AlertVariants = VariantProps<typeof alert>;
