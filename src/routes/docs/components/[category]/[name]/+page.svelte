<script lang="ts">
	import { page } from '$app/state';
	import { slugify } from '$utils/string.js';
	import { getContext } from 'svelte';

	let { data } = $props();

	const v = getContext<{ headings: HTMLHeadingElement[] }>('headings');

	$effect(() => {
		page.url.pathname;

		const arr = Array.from(document.getElementsByTagName('h2'));

		for (const el of arr) {
			el.id = slugify(el.textContent!);
		}

		v.headings = Array.from(document.getElementsByTagName('h2'));
	});
</script>

<svelte:head>
	<title>{data.name} | Components</title>
</svelte:head>

<div id="content" class="relative w-full py-6">
	<data.Component />
</div>

<style lang="postcss">
	@reference '../../../../../app.css';

	#content :global {
		h1 {
			@apply mb-4 text-2xl font-bold;
		}

		h2 {
			@apply mb-4 text-xl font-bold;
		}

		p {
			@apply mb-4;
		}

		code {
			@apply rounded-lg bg-primary px-2 py-1 text-white;
		}

		.ui-container {
			@apply relative mb-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-grey-soft p-6;
		}
	}
</style>
