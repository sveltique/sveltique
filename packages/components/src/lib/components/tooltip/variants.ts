import { tv } from 'tailwind-variants';

export const tooltip = tv({
	slots: {
		container: 'relative',
		tip: 'absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-100 dark:border-none dark:shadow-md dark:bg-zinc-900 bg-white p-2 text-xs shadow-sm'
	}
});
