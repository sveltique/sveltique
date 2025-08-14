import { tv, type VariantProps } from 'tailwind-variants';

export const codeBlock = tv({
	slots: {
		container: 'code-block group relative text-sm',
		button:
			'absolute top-4 right-4 z-10 hidden cursor-pointer rounded-lg border border-zinc-300 bg-transparent p-2 duration-150 group-hover:block hover:bg-white',
		icon: 'aspect-square h-5'
	},
	variants: {
		showLineNumbers: {
			true: {
				container: 'show-line-numbers'
			}
		}
	}
});

export type CodeBlockVariants = VariantProps<typeof codeBlock>;
