import { tv, type VariantProps } from 'tailwind-variants';

export const separator = tv({
	base: 'relative bg-muted',
	variants: {
		orientation: {
			horizontal: 'h-px w-full',
			vertical: 'self-stretch w-px'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

export type SeparatorVariants = VariantProps<typeof separator>;
