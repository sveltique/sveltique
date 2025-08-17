import { tv, type VariantProps } from 'tailwind-variants';

export const accordion = tv({
	base: 'relative flex w-full flex-col overflow-hidden'
});

export const accordionItem = tv({
	slots: {
		container:
			'relative flex w-full flex-col border border-b-0 border-zinc-300 p-4 first:rounded-t-2xl last:rounded-b-2xl last:border-b dark:border-zinc-700 dark:text-zinc-100',
		trigger:
			'group cursor-pointer flex items-center justify-between gap-5 text-start focus:outline-none',
		header:
			'pointer-events-none relative flex w-full items-center justify-between gap-5 text-start group-focus:outline-none group-focus-visible:ring-2 group-focus-visible:ring-blue-700 group-focus-visible:ring-offset-2 dark:group-focus-visible:ring-blue-300 dark:group-focus-visible:ring-offset-zinc-900',
		iconContainer: 'duration-150 ease-in-out',
		icon: 'w-5 min-w-5',
		panel: 'flex w-full flex-col gap-2 pt-4'
	},
	variants: {
		open: {
			true: {
				header: 'font-bold',
				iconContainer: 'rotate-180'
			}
		}
	}
});

export type AccordionItemVariants = VariantProps<typeof accordionItem>;
