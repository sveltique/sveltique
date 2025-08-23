import { tv, type VariantProps } from 'tailwind-variants';

export const toast = tv({
	slots: {
		container:
			'relative flex w-full items-center gap-4 overflow-hidden rounded-lg px-4 py-3 shadow-md bg-background border border-zinc-100 dark:border-none dark:shadow-md',
		icon: 'size-6 shrink-0',
		content: 'flex-grow text-sm',
		closeButton: 'cursor-pointer border-none bg-transparent',
		closeIcon: 'size-5'
	},
	variants: {
		type: {
			success: {
				icon: 'text-success'
			},
			info: {
				icon: 'text-info'
			},
			warning: {
				icon: 'text-warning'
			},
			danger: {
				icon: 'text-danger'
			}
		}
	},
	defaultVariants: {
		type: 'info'
	}
});

export type ToastVariants = Required<VariantProps<typeof toast>>;
