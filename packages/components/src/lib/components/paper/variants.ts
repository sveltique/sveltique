import { tv, type VariantProps } from 'tailwind-variants';

export const paper = tv({
	base: 'relative rounded-2xl bg-white overflow-hidden',
	variants: {
		variant: {
			shadow: '',
			outline: 'border border-zinc-300 dark:border-none dark:bg-zinc-800'
		},
		elevation: {
			0: 'shadow-none',
			1: 'shadow-sm',
			2: 'shadow-xs',
			3: 'shadow-sm',
			4: 'shadow-[0_0_8px_4px_rgba(0,0,0,0.1)]',
			24: 'shadow-2xl'
		}
	},
	defaultVariants: {
		variant: 'shadow',
		elevation: 1
	}
});

export type PaperVariants = VariantProps<typeof paper>;
