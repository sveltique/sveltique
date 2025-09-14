import { tv, type VariantProps } from "tailwind-variants";

export const avatar = tv({
	slots: {
		container:
			"relative rounded-full h-10 aspect-square grid place-items-center overflow-hidden inset-shadow-md",
		image: "object-cover w-full h-full"
	}
});

export type AvatarVariants = VariantProps<typeof avatar>;
