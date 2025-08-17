import { tv, type VariantProps } from 'tailwind-variants';

export const paper = tv({
	// TODO : bg-color should scale with elevation
	base: 'relative rounded-2xl bg-white dark:bg-zinc-900',
	variants: {
		variant: {
			shadow: '',
			outline: 'border border-zinc-300 dark:border-zinc-700'
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
		variant: 'outline'
	},
	compoundVariants: [
		{
			variant: 'outline',
			class: 'shadow-none'
		}
	]
});

export type PaperVariants = VariantProps<typeof paper>;
