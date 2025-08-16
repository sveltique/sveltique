import { tv, type VariantProps } from 'tailwind-variants';

export const link = tv({
	base: 'text-blue-700 dark:text-blue-300',
	variants: {
		underline: {
			always: 'underline',
			hover: 'hover:underline',
			none: ''
		}
	},
	defaultVariants: {
		underline: 'always'
	}
});

export type LinkVariants = VariantProps<typeof link>;
