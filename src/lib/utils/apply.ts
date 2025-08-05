/** Applies functions to a value. */
export function apply<T>(initial: T, ...fns: Array<(v: T) => T>) {
	return fns.reduce((prev, curr) => curr(prev), initial);
}
