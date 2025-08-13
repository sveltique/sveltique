import { tv } from 'tailwind-variants';

export const checkbox = tv({
	base: 'relative cursor-pointer rounded-sm border-2 border-zinc-400 text-blue-700',
	variants: {
		checked: {
			true: 'border-none'
		},
		disabled: {
			true: 'border-zinc-300 cursor-not-allowed'
		}
	},
	compoundVariants: [
		{
			checked: true,
			disabled: true,
			class: 'text-blue-700/50'
		}
	]
});
