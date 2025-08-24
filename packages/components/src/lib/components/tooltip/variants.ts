import { tv, type VariantProps } from 'tailwind-variants';

export const tooltip = tv({
	slots: {
		container: 'relative',
		tip: 'absolute left-1/2 -translate-x-1/2 text-foreground whitespace-nowrap bg-background rounded-md border border-muted shadow-sm p-2 text-xs'
	},
	variants: {
		placement: {
			bottom: {
				tip: 'top-[calc(100%+8px)]'
			},
			top: {
				tip: 'bottom-[calc(100%+8px)]'
			}
		}
	},
	defaultVariants: {
		placement: 'bottom'
	}
});

export type TooltipVariants = VariantProps<typeof tooltip>;
