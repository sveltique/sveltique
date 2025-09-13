import type { MaybeGetter } from "@sveltique/components/types";
import { onMount } from "svelte";
import { on } from "svelte/events";
import { get } from "./getter";

type GetDynamicHeightOptions = {
	/** @default 0 */
	min?: number;
	/**
	 * The `*Height` attribute to target on the element.
	 * @default "scrollHeight"
	 */
	attribute?: "clientHeight" | "offsetHeight" | "scrollHeight";
};

export function getDynamicHeight(
	element: MaybeGetter<HTMLElement | undefined>,
	options: GetDynamicHeightOptions = {}
) {
	const { attribute = "scrollHeight", min = 0 } = options;

	const state = $state({ current: undefined as number | undefined });
	const _element = $derived(get(element));

	onMount(() => {
		if (!_element) return;

		state.current = Math.max(min, _element[attribute]);

		return on(window, "resize", () => {
			if (!_element) return;

			state.current = Math.max(min, _element[attribute]);
		});
	});

	return state;
}
