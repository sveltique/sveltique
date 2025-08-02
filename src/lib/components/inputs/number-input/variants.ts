import { tv } from 'tailwind-variants';

export const numberInput = tv({
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
