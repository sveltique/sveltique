import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges tailwind classes together, avoiding styling conflicts. */
export const cn = (...classLists: ClassValue[]) => {
	return twMerge(clsx(classLists));
};
