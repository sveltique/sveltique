import { on } from "svelte/events";

export function onKeyUp(
	key: string,
	callback: (event: KeyboardEvent) => void,
	element?: EventTarget
) {
	$effect.root(() => {
		$effect(() => {
			return on(
				element ?? window,
				"keyup",
				(event) => {
					const keyboardEvent = event as KeyboardEvent;
					keyboardEvent.key === key && callback(keyboardEvent);
				},
				{
					passive: true
				}
			);
		});
	});
}
