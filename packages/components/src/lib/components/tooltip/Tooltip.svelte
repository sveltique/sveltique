<script lang="ts">
	import type { Snippet } from 'svelte';
	import { on } from 'svelte/events';
	import { fade } from 'svelte/transition';

	type Ref = { current: HTMLElement | undefined };

	interface Props {
		children?: Snippet<[{ ref: Ref; props: { 'aria-labelledby': string } }]>;
		title: string;
		/** @default 1000 */
		z?: number;
	}

	let { children, title, z = 1000 }: Props = $props();

	const uid = $props.id();

	let ref = $state<Ref>({ current: undefined });
	let show = $state(false);

	$effect(() => {
		if (!ref.current) return;

		const cleanups = [
			...['pointerenter', 'focus'].map((type) =>
				on(ref.current!, type, () => {
					show = true;
				})
			),
			...['pointerleave', 'blur'].map((type) =>
				on(ref.current!, type, () => {
					show = false;
				})
			)
		];

		return () => cleanups.forEach((cleanup) => cleanup());
	});
</script>

<div class="relative">
	{@render children?.({ ref, props: { 'aria-labelledby': uid } })}
	{#if show}
		<div
			transition:fade={{ duration: 150 }}
			id={uid}
			role="tooltip"
			style="z-index: {z};"
			class="absolute left-1/2 top-[calc(100%+4px)] -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-100 bg-white p-2 text-xs shadow-sm"
		>
			{title}
		</div>
	{/if}
</div>
