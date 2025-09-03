export function useMutationObserver(
	target: () => Node | undefined,
	callback: MutationCallback,
	options?: MutationObserverInit
) {
	const _target = $derived(target());

	$effect(() => {
		if (!_target) return;

		const observer = new MutationObserver(callback);

		observer.observe(_target, options);

		return () => observer.disconnect();
	});
}
