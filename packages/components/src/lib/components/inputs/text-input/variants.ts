import { tv, type VariantProps } from 'tailwind-variants';

export const textInput = tv({
	slots: {
		input:
			'relative h-11 w-full rounded-2xl border border-zinc-300 px-4 text-sm dark:border-zinc-300-dark'
	}
});

export type TextInputVariants = VariantProps<typeof textInput>;
