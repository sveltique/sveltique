import { tv } from 'tailwind-variants';

export const dateInput = tv({
	slots: {
		input:
			'inline-flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md bg-white cursor-pointer',
		overlay: 'fixed inset-0 flex items-start justify-center pt-20 z-50 bg-black/30',
		panel: 'bg-white rounded-lg p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-80',
		grid: 'grid grid-cols-7 gap-1 mt-2'
	}
});
