import { tv, type VariantProps } from "tailwind-variants";

export const otp = tv({
	base: "relative flex justify-between items-center"
});

export const otpCell = tv({
	base: [
		"w-10 h-11 border border-muted bg-background text-foreground text-center text-sm",
		"focus:outline-none focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
		"first-of-type:rounded-l-lg last-of-type:rounded-r-lg"
	]
});

export type OTPVariants = VariantProps<typeof otp>;
export type OTPCellVariants = VariantProps<typeof otpCell>;
