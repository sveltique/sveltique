import { tv } from 'tailwind-variants';

export const tooltip = tv({
	slots: {
		container: 'relative',
		tip: 'absolute left-1/2 top-[calc(100%+4px)] -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-100 bg-white p-2 text-xs shadow-sm'
	}
});
