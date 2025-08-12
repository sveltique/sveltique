import { tv, type VariantProps } from 'tailwind-variants';

export const switchTv = tv({
	slots: {
		container: 'relative h-6 w-12 cursor-pointer rounded-full bg-zinc-300',
		thumb:
			'absolute top-0.5 left-0.5 aspect-square h-[calc(100%-0.25rem)] rounded-full bg-white pointer-events-none duration-150 ease-in-out'
	},
	variants: {
		checked: {
			true: {
				container: 'bg-blue-700 dark:bg-blue-400',
				thumb: 'translate-x-[calc(100%-0.25rem)]'
			}
		},
		disabled: {
			true: {
				container: 'bg-zinc-300/50 cursor-not-allowed'
			}
		}
	},
	compoundVariants: [
		{
			checked: true,
			disabled: true,
			class: {
				container: 'bg-blue-700/50'
			}
		}
	]
});

export type SwitchVariants = VariantProps<typeof switchTv>;
