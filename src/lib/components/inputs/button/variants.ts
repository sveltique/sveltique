import { tv, type VariantProps } from 'tailwind-variants';

/** The styles of a button. */
export const button = tv({
	base: 'relative duration-150 ease-in-out text-center flex items-center gap-5 cursor-pointer [&_*]:pointer-events-none',
	variants: {
		variant: {
			contained:
				'bg-primary text-white hover:bg-primary/90 dark:bg-blue-400 dark:text-zinc-800 dark:hover:bg-blue-500',
			outline:
				'bg-transparent text-black hover:bg-zinc-100 dark:text-white dark:hover:bg-grey-soft-dark border border-solid border-grey-soft font-medium dark:border-grey-soft-dark',
			text: 'bg-transparent text-black hover:bg-zinc-100 dark:text-white dark:hover:bg-grey-soft-dark'
		},
		shape: {
			rectangle: 'rounded-2xl',
			square: 'rounded-2xl',
			circle: 'rounded-full'
		},
		size: {
			small: 'px-4 py-2',
			medium: 'px-6 py-3',
			large: 'px-8 py-4'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50'
		}
	},
	compoundVariants: [
		{
			shape: 'rectangle',
			size: 'small',
			class: 'rounded-lg'
		},
		{
			shape: 'square',
			size: 'small',
			class: 'p-2 rounded-lg'
		},
		{
			shape: 'square',
			size: 'medium',
			class: 'p-3 rounded-2xl'
		},
		{
			shape: 'square',
			size: 'large',
			class: 'p-4 rounded-2xl'
		},
		{
			shape: 'circle',
			size: 'small',
			class: 'p-2 rounded-full'
		},
		{
			shape: 'circle',
			size: 'medium',
			class: 'p-3 rounded-full'
		},
		{
			shape: 'circle',
			size: 'large',
			class: 'p-4 rounded-full'
		}
	],
	defaultVariants: {
		size: 'medium',
		variant: 'contained',
		shape: 'rectangle'
	}
});

export type ButtonVariants = VariantProps<typeof button>;
