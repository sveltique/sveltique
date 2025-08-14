<script>
	import { page } from '$app/state';
	import { getOnThisPageContext } from '$lib/contexts/on-this-page.svelte';
	import { CodeBlock, Link } from '@sveltique/components';

	const headings = getOnThisPageContext();

	$effect(() => {
		page.url.pathname && headings.getFromDOM();
	});
</script>

<svelte:head>
	<title>Installation - sveltique/components</title>
</svelte:head>

<h1 class="text-3xl font-bold">Installation</h1>
<p>Install Sveltique components library.</p>

<h2>Default installation</h2>
<p>You can easily import the library via npm.</p>
<CodeBlock
	code="npm install @sveltique/components"
	lang="bash"
	theme="catppuccin-latte"
	class="**:font-cascadia-code"
/>

<h3>Peer dependencies</h3>
<p>Note that you should at least have Svelte at version 5.25.0 to use the library.</p>
<CodeBlock
	code={`"peerDependencies": {
    "svelte": "^5.25.0"
}`}
	lang="json"
	theme="catppuccin-latte"
	class="**:font-cascadia-code"
/>

<h3>Optional dependencies</h3>
<p>These libraries are optional if you don't use the components that rely on them.</p>

<h4>Code Block</h4>
<p>
	The <code>{'<CodeBlock />'}</code> component uses <Link href="https://shiki.style" external
		>shiki</Link
	> under the hood to provide syntax highlighting.
</p>
<CodeBlock
	code="npm install shiki"
	lang="bash"
	theme="catppuccin-latte"
	class="**:font-cascadia-code"
/>

<style lang="postcss">
	@reference "../../../../app.css";

	h1 {
		@apply w-full text-3xl font-bold;
	}

	h2 {
		@apply mb-4 mt-12 scroll-mt-[calc(4rem-2px)] border-t border-zinc-300 pt-6 text-2xl font-bold;
	}

	h3 {
		@apply mt-8 scroll-mt-20 text-xl font-bold;
	}

	h4 {
		@apply mt-8 scroll-mt-20 text-lg font-bold;
	}

	p {
		@apply my-4;
	}
</style>
