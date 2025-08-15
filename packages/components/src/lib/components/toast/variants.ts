import { tv, type VariantProps } from 'tailwind-variants';

export const toast = tv({
	slots: {
		container:
			'relative flex w-full items-center gap-4 overflow-hidden rounded-lg px-4 py-3 shadow-md bg-white border border-zinc-100',
		icon: 'size-6 shrink-0',
		content: 'flex-grow text-sm',
		closeButton: 'cursor-pointer border-none bg-transparent',
		closeIcon: 'size-5'
	},
	variants: {
		type: {
			success: {
				icon: 'text-green-500'
			},
			info: {
				icon: 'text-blue-500'
			},
			warning: {
				icon: 'text-yellow-500'
			},
			danger: {
				icon: 'text-red-500'
			}
		}
	},
	defaultVariants: {
		type: 'info'
	}
});

export type ToastVariants = Required<VariantProps<typeof toast>>;
