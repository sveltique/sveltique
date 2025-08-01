import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

/** Merges tailwind classes together, avoiding styling conflicts. */
export const cn = (...classLists: ClassValue[]) => {
	return twMerge(clsx(classLists));
};
