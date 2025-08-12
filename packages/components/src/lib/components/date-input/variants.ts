import { tv } from 'tailwind-variants';

export const dateInput = tv({
	slots: {
		input:
			'relative flex items-center gap-2.5 h-11 rounded-2xl border border-zinc-300 px-4 text-sm dark:border-zinc-300-dark cursor-pointer',
		grid: 'grid grid-cols-7 gap-1 mt-2'
	}
});
