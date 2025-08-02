import { tv } from 'tailwind-variants';

export const field = tv({
	slots: {
		container: 'relative flex flex-col items-start gap-2.5',
		textInput:
			'relative h-11 rounded-2xl border border-grey-soft px-4 text-sm dark:border-grey-soft-dark'
	},
	variants: {
		fullWidth: {
			true: {
				container: 'w-full',
				textInput: 'w-full'
			}
		}
	}
});

export const numberField = tv({
	slots: {
		container:
			'relative flex h-11 justify-between overflow-hidden rounded-2xl border border-grey-soft',
		input: 'w-auto border-none'
	},
	variants: {
		fullWidth: {
			true: {
				container: 'w-full',
				input: 'flex-2'
			}
		}
	}
});
