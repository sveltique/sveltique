<script>
	import CodeBlock from '$components/CodeBlock.svelte';
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Button, Link, Tooltip } from '@sveltique/components';

	const code = {
		short: `<Tooltip title="Sveltique is awesome">
    {#snippet children({ props, ref })}
        <Button bind:ref={ref.current} {...props}>
            Hover me !
        </Button>
    {/snippet}
</Tooltip>`,
		expanded: `${script("import { Button, Tooltip } from '@sveltique/components';")}

<Tooltip title="Sveltique is awesome">
    {#snippet children({ props, ref })}
        <Button bind:ref={ref.current} {...props}>
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

<h2>Tree Shaking</h2>
<p>
	To reduce your bundle, you can import each component individually instead of using the root
	import.
</p>
<CodeBlock code={'import { Alert } from "@sveltique/components/alert";'} lang="ts" />
