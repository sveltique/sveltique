import type { ClassNameValue } from 'tailwind-merge';

/** Adds (or replaces) a class property that is valid with `tv`. */
export type ReplaceWithTWMergeClass<T> = Omit<T, 'class'> & TWMergeClass;

export type TWMergeClass = {
	class?: ClassNameValue;
};

export type WithRef<T extends HTMLElement> = {
	ref?: T;
};
