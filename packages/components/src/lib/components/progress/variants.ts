import { tv, type VariantProps } from 'tailwind-variants';

export const progress = tv({
	slots: {
		track: 'relative h-4 w-full overflow-hidden rounded-full bg-zinc-300 dark:bg-zinc-700',
		fill: 'absolute -left-full h-full w-full rounded-full bg-blue-700 dark:bg-blue-300'
	},
	variants: {
		transition: {
			true: {
				fill: 'duration-250'
			}
		}
	}
});

export type ProgressVariants = VariantProps<typeof progress>;
