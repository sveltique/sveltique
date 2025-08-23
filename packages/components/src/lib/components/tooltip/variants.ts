import { tv } from 'tailwind-variants';

export const tooltip = tv({
	slots: {
		container: 'relative',
		tip: 'absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 text-foreground whitespace-nowrap bg-background rounded-md border border-muted shadow-sm p-2 text-xs'
	}
});
