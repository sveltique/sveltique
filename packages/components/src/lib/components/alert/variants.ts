import { tv, type VariantProps } from 'tailwind-variants';

export const alert = tv({
	slots: {
		container: 'relative flex w-full items-center gap-5 rounded-2xl p-5',
		icon: 'min-h-6 min-w-6'
	},
	variants: {
		type: {
			success: {
				container: 'bg-green-50 dark:bg-green-800',
				icon: 'text-green-500 dark:text-green-400'
			},
			warning: {
				container: 'bg-yellow-50 dark:bg-yellow-800',
				icon: 'text-yellow-500 dark:text-yellow-400'
			},
			info: {
				container: 'bg-blue-50 dark:bg-blue-800',
				icon: 'text-blue-500 dark:text-blue-400'
			},
			danger: {
				container: 'bg-red-50 dark:bg-red-800',
				icon: 'text-red-500 dark:text-red-400'
			}
		}
	}
});

export type AlertVariants = VariantProps<typeof alert>;
