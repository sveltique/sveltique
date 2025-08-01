import { tv, type VariantProps } from 'tailwind-variants';

export const separator = tv({
	base: 'relative bg-zinc-300 dark:bg-zinc-700',
	variants: {
		orientation: {
			horizontal: 'h-px w-full',
			vertical: 'h-full w-px'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

export type SeparatorVariants = VariantProps<typeof separator>;
