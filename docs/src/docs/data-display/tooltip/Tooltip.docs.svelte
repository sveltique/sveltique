<script>
	import { Badge, Button, Tooltip } from '@sveltique/components';
	import Playground from '$components/Playground.svelte';
	import IconEdit from '@tabler/icons-svelte/icons/edit';
	import { script } from '$utils/playground';

	const code = {
		short: `<Tooltip title="Edit post">
    {#snippet children({ props, ref })}
        <Button
            bind:ref={ref.current}
            shape="square"
            {...props}
        >
            <IconEdit />
        </Button>
    {/snippet}
</Tooltip>`,
		expanded: `${script("import { Button, Tooltip } from '@sveltique/components';")}

<Tooltip title="Edit post">
    {#snippet children({ props, ref })}
        <Button
            bind:ref={ref.current}
            shape="square"
            {...props}
        >
            <IconEdit />
        </Button>
    {/snippet}
</Tooltip>`
	};

	const customComponentCode = {};
</script>

<h1>Tooltip</h1>
<p>Display informative text when users hover over, focus on, or tap an element.</p>

<h2>Basic Usage</h2>
<Playground {code}>
	<Tooltip title="Edit post">
		{#snippet children({ props, ref })}
			<Button bind:ref={ref.current} shape="square" {...props}>
				<IconEdit />
			</Button>
		{/snippet}
	</Tooltip>
</Playground>
