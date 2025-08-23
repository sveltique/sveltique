import { tv } from 'tailwind-variants';

export const textArea = tv({
	base: [
		'relative w-full rounded-2xl border border-muted bg-transparent p-4 text-sm',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background'
	]
});
