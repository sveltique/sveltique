<script>
import { Alert, Badge, Button, Tooltip } from "@sveltique/components";
import IconEdit from "@tabler/icons-svelte/icons/edit";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

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

const customComponentCode = `<Tooltip title="Edit post">
    {#snippet children({ ref })}
        <div bind:this={ref.current}>...</div>
    {/snippet}
</Tooltip>`;

const accessibleCode = `<Tooltip title="Edit post">
    <!-- props : { 'aria-describedby': string } -->
    {#snippet children({ props, ref })}
        <Button
            bind:ref={ref.current}
            shape="square"
            {...props}
        >
            <IconEdit />
        </Button>
    {/snippet}
</Tooltip>`;

const placementCode = `${script("import { Button, Tooltip } from '@sveltique/components';")}
    
<Tooltip title="I'm a bottom tooltip">
    {#snippet children({ props, ref })}
        <Button
            bind:ref={ref.current}
            {...props}
        >
            Bottom
        </Button>
    {/snippet}
</Tooltip>

<Tooltip title="I'm a top tooltip" placement="top">
    {#snippet children({ props, ref })}
        <Button
            bind:ref={ref.current}
            {...props}
        >
            Top
        </Button>
    {/snippet}
</Tooltip>`;
</script>

<h1 id="tooltip">Tooltip</h1>
<p>Display informative text when users hover over, focus on, or tap an element.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code}>
	<Tooltip title="Edit post">
		{#snippet children({ props, ref })}
			<Button bind:ref={ref.current} shape="square" {...props}>
				<IconEdit />
			</Button>
		{/snippet}
	</Tooltip>
</Playground>

<h3 id="custom-children">Custom children</h3>
<p>
	You can use a custom component as the children of the tooltip as long as you can bind to an HTML
	element.
</p>
<CodeBlock code={customComponentCode} />

<h3 id="placement">Placement</h3>
<p>A tooltip can be placed on two sides : bottom (default) and top.</p>
<Playground code={placementCode}>
	<Tooltip title="I'm a bottom tooltip">
		{#snippet children({ props, ref })}
			<Button bind:ref={ref.current} {...props}>Bottom</Button>
		{/snippet}
	</Tooltip>

	<Tooltip title="I'm a top tooltip" placement="top">
		{#snippet children({ props, ref })}
			<Button bind:ref={ref.current} {...props}>Top</Button>
		{/snippet}
	</Tooltip>
</Playground>

<h2 id="accessibility">Accessibility</h2>
<p>
	To make the tooltip accessible, it must be linked to the item it describes. For this, pass down
	the tooltip's ID by using the <Badge>props</Badge> parameter.
</p>
<Alert type="info" class="mb-4">
	You can set a custom ID on the tooltip and the props will use it. Otherwise, it will use a
	generated one via <Badge>$props.id()</Badge>.
</Alert>
<CodeBlock code={accessibleCode} />
