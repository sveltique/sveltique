<script>
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Button, Link, Tooltip } from '@sveltique/components';

	const code = {
		short: `<Tooltip title="Sveltique is awesome">
    {#snippet children({ props, ref })}
        <Button 
            bind:ref={ref.current} 
            size="small" 
            {...props}
        >
            Hover me !
        </Button>
    {/snippet}
</Tooltip>`,
		expanded: `${script("import { Button, Tooltip } from '@sveltique/components';")}

<Tooltip title="Sveltique is awesome">
    {#snippet children({ props, ref })}
        <Button 
            bind:ref={ref.current} size="small" 
            {...props}
        >
            Hover me !
        </Button>
    {/snippet}
</Tooltip>`
	};
</script>

<svelte:head>
	<title>Usage - sveltique/components</title>
</svelte:head>

<h1>Usage</h1>
<p>Learn the basics of Sveltique components to use them in your project.</p>

<h2>Quickstart</h2>
<p>
	After <Link href="/docs/components/installation">installation</Link>, you can start importing
	Sveltique components in your project. It's that simple !
</p>
<Playground {code}>
	<Tooltip title="Sveltique is awesome">
		{#snippet children({ props, ref })}
			<Button bind:ref={ref.current} size="small" {...props}>Hover me !</Button>
		{/snippet}
	</Tooltip>
</Playground>

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
