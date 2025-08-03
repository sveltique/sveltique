import { tv, type VariantProps } from 'tailwind-variants';

export const textInput = tv({
	slots: {
		input:
			'relative h-11 w-full rounded-2xl border border-grey-soft px-4 text-sm dark:border-grey-soft-dark'
	}
});

export type TextInputVariants = VariantProps<typeof textInput>;
