import type { ClassNameValue } from 'tailwind-merge';

/** Adds (or replaces) a class property that is valid with `tv`. */
export type WithTWMergeClass<T> = Omit<T, 'class'> & {
	class?: ClassNameValue;
};
