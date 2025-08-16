import { tv, type VariantProps } from 'tailwind-variants';

export const codeBlock = tv({
	slots: {
		container:
			'code-block group relative w-full flex flex-col py-5 rounded-2xl overflow-x-auto text-sm',
		code: 'contents flex flex-col flex-nowrap'
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
