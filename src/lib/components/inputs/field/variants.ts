import { tv } from 'tailwind-variants';

export const field = tv({
	slots: {
		container: 'relative w-full flex flex-col items-start gap-2.5',
		error: 'text-sm text-danger flex gap-2.5 items-center'
	}
});
