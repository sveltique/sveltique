import { tv, type VariantProps } from 'tailwind-variants';

export const accordion = tv({
	base: 'relative flex w-full flex-col overflow-hidden'
});

export const accordionItem = tv({
	slots: {
		container:
			'group relative flex w-full flex-col border border-b-0 border-zinc-300 first:rounded-t-2xl last:rounded-b-2xl last:border-b dark:border-zinc-700 dark:text-zinc-100',
		trigger:
			'cursor-pointer flex items-center justify-between gap-5 p-4 text-start group-first:rounded-t-2xl group-last:rounded-b-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700',
		summary: 'pointer-events-none ',
		iconContainer: 'pointer-events-none duration-150 ease-in-out',
		icon: 'w-5 min-w-5',
		details: 'flex w-full flex-col gap-2 px-4 pb-4'
	},
	variants: {
		open: {
			true: {
				summary: 'font-bold',
				iconContainer: 'rotate-180'
			}
		}
	}
});

export type AccordionItemVariants = VariantProps<typeof accordionItem>;
