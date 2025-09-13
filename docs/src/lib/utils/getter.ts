import type { MaybeGetter } from "@sveltique/components/types";

export function get<T>(value: MaybeGetter<T>) {
	return value instanceof Function ? value() : value;
}
