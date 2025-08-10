import { paper } from '$lib/components/surfaces/paper/variants.js';
import { tv, type VariantProps } from 'tailwind-variants';

export const select = tv({
	slots: {
		container: 'relative w-full',
		trigger: paper({
			variant: 'outline',
			elevation: 0,
			class: 'flex w-full cursor-pointer items-center gap-3 py-3 pr-3 pl-6'
		}),
		triggerContent: 'pointer-events-none grow text-start text-sm',
		triggerIcon: 'pointer-events-none size-4',
		listBox: paper({
			elevation: 4,
			class:
				'absolute top-full z-10 left-0 hidden w-full flex-col divide-y divide-zinc-300 overflow-hidden'
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
		container: 'cursor-pointer px-6 py-3 text-sm'
	},
	variants: {
		selected: {
			true: {
				container: 'bg-blue-700 text-white'
			}
		},
		disabled: {
			true: {
				container: 'italic cursor-not-allowed'
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
