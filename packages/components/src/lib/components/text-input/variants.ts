import { tv, type VariantProps } from 'tailwind-variants';

export const textInput = tv({
	base: [
		'relative h-11 w-full rounded-2xl border border-muted bg-transparent px-4 text-sm',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-blue-300 dark:focus:ring-offset-zinc-900'
	]
});

export type TextInputVariants = VariantProps<typeof textInput>;
