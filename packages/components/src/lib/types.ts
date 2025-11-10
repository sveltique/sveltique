import type { ClassNameValue } from "tailwind-merge";

/** Adds (or replaces) a class property that is valid with `tv`. */
export type ReplaceWithTWMergeClass<T> = Omit<T, "class"> & TWMergeClass;

export type TWMergeClass = {
	/**
	 * Additional classes to add to the element.
	 * @default —
	 */
	class?: ClassNameValue;
};

/** @deprecated Use `Ref<T>` instead. */
export type WithRef<T extends HTMLElement> = {
	/**
	 * The underlying DOM element that is rendered.
	 * @bindable
	 * @default —
	 */
	ref?: T;
};

export type Ref<T extends HTMLElement> = {
	/**
	 * The underlying DOM element that is rendered.
	 * @bindable
	 * @default —
	 */
	ref?: T;
};

export type MaybeGetter<T> = T | (() => T);
