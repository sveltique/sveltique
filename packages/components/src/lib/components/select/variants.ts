import { paper } from '../paper/variants.js';
import { tv, type VariantProps } from 'tailwind-variants';

export const select = tv({
	slots: {
		container: 'relative',
		trigger: paper({
			variant: 'outline',
			class: 'flex w-full cursor-pointer items-center gap-3 px-4 h-11'
		}),
		triggerContent: 'pointer-events-none grow text-start text-sm',
		triggerIcon: 'pointer-events-none size-4 text-zinc-500 duration-150 ease-in-out',
		listBox: paper({
			elevation: 4,
			class:
				'absolute p-2 top-[calc(100%+0.625rem)] z-10 left-0 hidden w-full flex-col min-w-max shadow-md'
		})
	},
	variants: {
		open: {
			true: {
				triggerIcon: 'rotate-180',
				listBox: 'flex'
			}
		}
	}
});

export type SelectVariants = VariantProps<typeof select>;

export const option = tv({
	slots: {
		container:
			'cursor-pointer relative flex items-center justify-between gap-2.5 rounded-lg py-2 px-4 text-sm'
	},
	variants: {
		selected: {
			true: {
				container: 'bg-blue-700 text-white'
			}
		},
		disabled: {
			true: {
				container: 'italic cursor-not-allowed text-zinc-500'
			},
			false: {
				container: 'hover:bg-zinc-100'
			}
		}
	},
	compoundVariants: [
		{
			selected: true,
			disabled: false,
			class: {
				container: 'hover:bg-blue-700'
			}
		}
	]
});

export type OptionVariants = VariantProps<typeof option>;
