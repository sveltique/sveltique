import { tv, type VariantProps } from 'tailwind-variants';

export const textInput = tv({
	slots: {
		input:
			'relative h-11 rounded-2xl border border-grey-soft px-4 text-sm dark:border-grey-soft-dark'
	},
	variants: {
		fullWidth: {
			true: {
				input: 'w-full'
			}
		}
	}
});

export type TextInputVariants = VariantProps<typeof textInput>;
