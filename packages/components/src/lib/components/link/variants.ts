import { tv, type VariantProps } from 'tailwind-variants';

export const link = tv({
	slots: {
		container: 'text-blue-700 dark:text-blue-300 inline-flex',
		icon: 'aspect-square w-5 shrink-0 ml-1'
	},
	variants: {
		underline: {
			always: {
				container: 'underline'
			},
			hover: {
				container: 'hover:underline'
			},
			none: {
				container: ''
			}
		}
	},
	defaultVariants: {
		underline: 'always'
	}
});

export type LinkVariants = VariantProps<typeof link>;
