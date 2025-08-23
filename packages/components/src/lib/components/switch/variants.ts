import { tv, type VariantProps } from 'tailwind-variants';

export const switchTv = tv({
	slots: {
		container: 'relative h-6 w-12 cursor-pointer rounded-full bg-muted',
		thumb:
			'absolute top-0.5 left-0.5 aspect-square h-[calc(100%-0.25rem)] rounded-full bg-background pointer-events-none duration-150 ease-in-out'
	},
	variants: {
		checked: {
			true: {
				container: 'bg-primary',
				thumb: 'translate-x-[calc(100%+0.25rem)]'
			}
		},
		disabled: {
			true: {
				container: 'bg-muted/50 cursor-not-allowed'
			},
			false: {
				container:
					'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background'
			}
		}
	},
	compoundVariants: [
		{
			checked: true,
			disabled: true,
			class: {
				container: 'bg-primary-disabled',
				thumb: 'bg-muted'
			}
		}
	]
});

export type SwitchVariants = VariantProps<typeof switchTv>;
