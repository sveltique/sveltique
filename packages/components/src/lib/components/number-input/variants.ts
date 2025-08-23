import { tv } from 'tailwind-variants';

export const numberInput = tv({
	slots: {
		container:
			'relative w-full flex h-11 justify-center overflow-hidden rounded-2xl border border-muted',
		input: 'border-none flex-1 min-w-0 text-center text-sm bg-transparent',
		decrement:
			'relative grid aspect-square h-full place-items-center cursor-pointer border-r border-muted duration-200 hover:bg-muted',
		increment:
			'relative grid aspect-square h-full place-items-center cursor-pointer border-l border-muted duration-200 hover:bg-muted',
		icon: 'size-4'
	}
});
