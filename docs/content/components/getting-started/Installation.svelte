<script>
	import CodeBlock from '$components/CodeBlock.svelte';
	import { Link } from '@sveltique/components';
</script>

<svelte:head>
	<title>Installation - sveltique/components</title>
</svelte:head>

<h1 class="text-3xl font-bold">Installation</h1>
<p>Install Sveltique components library.</p>

<h2>Default installation</h2>
<p>You can easily import the library via npm.</p>
<CodeBlock code="npm install @sveltique/components" lang="bash" />

<h3>Peer dependencies</h3>
<p>Note that you should at least have Svelte at version 5.25.0 to use the library.</p>
<CodeBlock
	code={`"peerDependencies": {
    "svelte": "^5.25.0"
}`}
	lang="json"
/>

<h3>Optional dependencies</h3>
<p>These libraries are optional if you don't use the components that rely on them.</p>

<h4>Code Block</h4>
<p>
	The <code>{'<CodeBlock />'}</code> component uses <Link href="https://shiki.style" external
		>shiki</Link
	> under the hood to provide syntax highlighting.
</p>
<CodeBlock code="npm install shiki" lang="bash" />

<style lang="postcss">
	@reference "tailwindcss";

	h1 {
		@apply w-full text-3xl font-bold dark:text-zinc-100;
	}

	h2 {
		@apply mb-4 mt-12 scroll-mt-[calc(4rem-2px)] border-t border-zinc-300 pt-6 text-2xl font-bold dark:border-zinc-700 dark:text-zinc-100;
	}

	h3 {
		@apply mt-8 scroll-mt-20 text-xl font-bold dark:text-zinc-100;
	}

	h4 {
		@apply mt-8 scroll-mt-20 text-lg font-bold dark:text-zinc-100;
	}

	p {
		@apply my-4;
	}
</style>
