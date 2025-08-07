import { tv } from 'tailwind-variants';

export const modal = tv({
	slots: {
		background: 'fixed top-0 left-0 z-10 h-full w-full bg-black/50 backdrop-blur-[2px] z-[1000]',
		dialog:
			'fixed top-1/2 left-0 z-10 flex max-h-[85%] w-full -translate-y-1/2 flex-col gap-5 overflow-auto p-4 shadow-2xl z-[1000] ' +
			'bg-white dark:bg-zinc-800 sm:left-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:rounded-2xl sm:p-6',
		actions: 'relative flex w-full flex-col gap-[10px] sm:flex-row sm:justify-end sm:gap-3'
	}
});
