import { tv } from 'tailwind-variants';

export const textArea = tv({
	base: [
		'relative w-full rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-4 text-sm',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-blue-300 dark:focus:ring-offset-zinc-900'
	]
});
