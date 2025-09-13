import { tv, type VariantProps } from "tailwind-variants";

export const codeBlock = tv({
	slots: {
		container: "relative w-full text-sm rounded-large flex flex-col overflow-hidden",
		header: "relative w-full flex items-center justify-between px-5 py-2.5",
		filename: "font-codeblock",
		pre: "code-block relative w-full grow flex flex-col overflow-auto",
		code: "contents flex flex-col flex-nowrap py-5 grow font-codeblock"
	}
});

export type CodeBlockVariants = VariantProps<typeof codeBlock>;
