import type { MaybeGetter } from '$lib/types.js';
import { on } from 'svelte/events';

interface OnKeyOptions {
	/** @default window */
	element?: MaybeGetter<EventTarget | undefined>;
	/** @default false */
	preventDefault?: boolean;
}

export function onKeyUp(
	key: string | string[],
	callback: (event: KeyboardEvent) => void,
	options: OnKeyOptions = {}
) {
	_onKey('keyup', key, callback, options);
}

export function onKeyDown(
	key: string | string[],
	callback: (event: KeyboardEvent) => void,
	options: OnKeyOptions = {}
) {
	_onKey('keydown', key, callback, options);
}

function _onKey(
	event: string,
	key: string | string[],
	callback: (event: KeyboardEvent) => void,
	options: OnKeyOptions = {}
) {
	const { element = window, preventDefault = false } = options;

	let _keys = $derived(Array.isArray(key) ? key : [key]);
	let _element = $derived(typeof element === 'function' ? element() : element);

	$effect(() => {
		if (!_element) return;

		const fns = _keys.map((key) =>
			on(
				_element,
				event,
				(e) => {
					const keyboardEvent = e as KeyboardEvent;
					keyboardEvent.key === key && callback(keyboardEvent);
				},
				{
					passive: !preventDefault
				}
			)
		);

		return () => fns.forEach((fn) => fn());
	});
}
