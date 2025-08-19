import { tv } from 'tailwind-variants';

export const checkbox = tv({
	base: [
		'relative cursor-pointer rounded-sm border-2 border-zinc-400 dark:border-zinc-600 text-blue-700 dark:text-blue-300',
		'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 focus-visible:ring-blue-700 dark:focus-visible:ring-blue-300'
	],
	variants: {
		checked: {
			true: 'border-none'
		},
		disabled: {
			true: 'border-zinc-300 dark:border-zinc-700 cursor-not-allowed'
		}
	},
	compoundVariants: [
		{
			checked: true,
			disabled: true,
			class: 'text-blue-700/50 dark:text-blue-300/50'
		}
	]
});
