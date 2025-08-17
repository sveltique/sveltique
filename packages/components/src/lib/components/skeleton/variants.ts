import { tv, type VariantProps } from 'tailwind-variants';

export const skeleton = tv({
	base: 'rounded-2xl bg-zinc-200 dark:bg-zinc-800',
	variants: {
		animation: {
			pulse: 'animate-pulse',
			none: ''
		}
	},
	defaultVariants: {
		animation: 'pulse'
	}
});

export type SkeletonVariants = VariantProps<typeof skeleton>;
