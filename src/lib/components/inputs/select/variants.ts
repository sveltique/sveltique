import { paper } from '$lib/components/surfaces/paper/variants.js';
import { tv } from 'tailwind-variants';

export const select = tv({
	slots: {
		container: 'relative',
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
				'absolute top-full left-0 hidden w-full flex-col divide-y divide-grey-soft overflow-hidden'
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

export const option = tv({
	slots: {
		container: 'cursor-pointer px-6 py-3 text-sm'
	},
	variants: {
		selected: {
			true: 'bg-primary text-white'
		}
	}
});
