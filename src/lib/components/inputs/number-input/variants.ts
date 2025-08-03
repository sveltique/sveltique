import { tv } from 'tailwind-variants';

export const numberInput = tv({
	slots: {
		container:
			'relative w-full flex h-11 justify-center overflow-hidden rounded-2xl border border-grey-soft',
		input: 'border-none flex-1 min-w-0 text-center text-sm',
		decrement:
			'relative grid aspect-square h-full place-items-center cursor-pointer border-r border-grey-soft duration-200 hover:bg-grey-hover',
		increment:
			'relative grid aspect-square h-full place-items-center cursor-pointer border-l border-grey-soft duration-200 hover:bg-grey-hover'
	}
});
