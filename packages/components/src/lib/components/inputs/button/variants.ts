import { tv, type VariantProps } from 'tailwind-variants';

/** The styles of a button. */
export const button = tv({
	base: 'relative duration-150 ease-in-out text-center flex items-center gap-5 cursor-pointer [&_*]:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700',
	variants: {
		variant: {
			contained: '',
			outline: 'border border-solid font-medium',
			text: ''
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
		},
		color: {
			primary: '',
			danger: ''
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
		},
		{
			variant: 'contained',
			color: 'primary',
			class:
				'bg-blue-700 text-white not-disabled:hover:bg-blue-700/90 dark:bg-blue-400 dark:text-zinc-800 not-disabled:dark:hover:bg-blue-500'
		},
		{
			variant: 'outline',
			color: 'primary',
			class:
				'bg-transparent text-black not-disabled:hover:bg-zinc-100 dark:text-white not-disabled:dark:hover:bg-zinc-700 border-zinc-300 dark:border-zinc-300-dark'
		},
		{
			variant: 'text',
			color: 'primary',
			class:
				'bg-transparent text-black not-disabled:hover:bg-zinc-100 dark:text-white not-disabled:dark:hover:bg-zinc-700'
		},
		{
			variant: 'contained',
			color: 'danger',
			class:
				'bg-red-500 text-white not-disabled:hover:bg-red-500/90 dark:bg-red-600 dark:text-white not-disabled:dark:hover:bg-red-700'
		},
		{
			variant: 'outline',
			color: 'danger',
			class:
				'bg-transparent text-red-500 border border-red-100 not-disabled:hover:bg-red-50 dark:text-red-400 not-disabled:dark:hover:bg-red-900'
		},
		{
			variant: 'text',
			color: 'danger',
			class:
				'bg-transparent text-red-500 not-disabled:hover:bg-red-50 dark:text-red-400 not-disabled:dark:hover:bg-red-900'
		}
	],
	defaultVariants: {
		size: 'medium',
		variant: 'contained',
		shape: 'rectangle',
		color: 'primary',
		disabled: false
	}
});

export type ButtonVariants = VariantProps<typeof button>;
