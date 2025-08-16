import { tv } from 'tailwind-variants';

export const field = tv({
	slots: {
		container: 'relative w-full flex flex-col items-start gap-2.5',
		label: 'text-sm font-bold dark:text-zinc-100',
		error: 'text-sm dark:text-red-400 text-red-500 flex gap-2.5 items-center',
		icon: 'h-5 aspect-square shrink-0'
	}
});
