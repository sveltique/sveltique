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
		& > h1 {
			@apply pb-4 text-2xl font-bold;
		}

		& > h2 {
			@apply py-4 text-xl font-bold;
		}

		& > p {
			@apply pb-4;
		}

		& > ul {
			@apply pb-4;
		}

		& > a {
			@apply text-primary underline;
		}
	}
</style>
