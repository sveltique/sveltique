import { tv, type VariantProps } from 'tailwind-variants';

export const paper = tv({
	base: 'relative rounded-2xl bg-white',
	variants: {
		variant: {
			shadow: '',
			outline: 'border border-grey-soft dark:border-none dark:bg-zinc-800'
		},
		elevation: {
			0: 'shadow-none',
			1: 'shadow-sm',
			2: 'shadow-xs',
			3: 'shadow-sm'
		}
	},
	defaultVariants: {
		variant: 'shadow',
		elevation: 1
	}
});

export type PaperVariants = VariantProps<typeof paper>;
