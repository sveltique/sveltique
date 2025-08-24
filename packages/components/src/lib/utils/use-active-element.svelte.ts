import { on } from "svelte/events";

type GetActiveElementOptions = {
	/**
	 * Whether to search for the active element inside shadow DOM or not.
	 * @default true
	 */
	searchInShadow?: boolean;
};

export function getActiveElement(options: GetActiveElementOptions = {}) {
	const { searchInShadow = true } = options;

	let current = $state<HTMLElement | null>(null);

	$effect(() => {
		const fns = [
			on(window, "blur", onBlur, { capture: true }),
			on(window, "focus", onFocus, { capture: true })
		];

		return () => fns.forEach((fn) => fn());
	});

	function onFocus() {
		current = getDeepActiveElement() as HTMLElement | null;
	}

	function onBlur(event: FocusEvent) {
		if (event.relatedTarget !== null) return;

		onFocus();
	}

	function getDeepActiveElement() {
		let element = document?.activeElement;

		if (searchInShadow) {
			while (element?.shadowRoot) {
				element = element?.shadowRoot?.activeElement;
			}
		}

		return element;
	}

	return {
		get current() {
			return current;
		}
	};
}
