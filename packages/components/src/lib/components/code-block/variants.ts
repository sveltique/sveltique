import { tv, type VariantProps } from "tailwind-variants";

export const codeBlock = tv({
	slots: {
		container: "relative w-full text-sm rounded-large",
		header: "relative w-full flex items-center justify-between px-5 py-2.5",
		filename: "font-codeblock",
		pre: "code-block relative w-full flex flex-col overflow-x-auto",
		code: "contents flex flex-col flex-nowrap py-5 font-codeblock"
	}
});

export type CodeBlockVariants = VariantProps<typeof codeBlock>;
