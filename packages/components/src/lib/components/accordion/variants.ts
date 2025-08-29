import { tv, type VariantProps } from "tailwind-variants";

export const accordion = tv({
	base: "relative flex w-full flex-col overflow-hidden text-sm"
});

export const accordionItem = tv({
	slots: {
		container:
			"relative flex w-full flex-col border border-b-0 border-muted text-foreground p-4 first:rounded-t-large last:rounded-b-large last:border-b",
		trigger:
			"group cursor-pointer flex items-center justify-between gap-5 text-start focus:outline-none",
		header: "pointer-events-none relative flex w-full items-center justify-between gap-5 text-start group-focus:outline-none group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
		iconContainer: "duration-150 ease-in-out",
		icon: "w-5 min-w-5",
		panel: "flex w-full flex-col gap-2 pt-4"
	},
	variants: {
		open: {
			true: {
				header: "font-bold",
				iconContainer: "rotate-180"
			}
		}
	}
});

export type AccordionItemVariants = VariantProps<typeof accordionItem>;
