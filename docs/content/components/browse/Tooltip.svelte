<script module>
export const metadata = {
	description: "Display informative text when users hover or focus an element."
};
</script>

<script lang="ts">
import type { Placement } from "@floating-ui/dom";
import { Alert, Badge, Button, Field, Kbd, Link, Select, Tooltip } from "@sveltique/components";
import IconEdit from "@tabler/icons-svelte/icons/edit";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";
    import { Table } from "$components/table";

let placement = $state<Placement>("top");
const placements: Placement[] = [
	"top",
	"top-start",
	"top-end",
	"right",
	"right-start",
	"right-end",
	"bottom",
	"bottom-start",
	"bottom-end",
	"left",
	"left-start",
	"left-end"
];

const code = `${script("import { Button, Tooltip } from '@sveltique/components';")}

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
</Tooltip>`;

const customComponentCode = `<Tooltip title="Edit post">
    {#snippet children({ ref })}
        <div bind:this={ref.current}>...</div>
    {/snippet}
</Tooltip>`;

const placementCode = `${script(`import { Button, Field, Select, Tooltip } from '@sveltique/components';

    let placement = $state<Placement>("bottom");
    const placements: Placement[] = [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end"
    ];`)}
    
<Field label="Placement" class="w-auto">
    {#snippet input({ props })}
        <Select.Root
            bind:value={placement}
            class="w-40"
            {...props}
        >
            {#each placements as placement (placement)}
                <Select.Option value={placement} />
            {/each}
        </Select.Root>
    {/snippet}
</Field>

<Tooltip title="I'm a {placement} tooltip" {placement}>
    {#snippet children({ props, ref })}
        <Button bind:ref={ref.current} {...props}>
            Hover me
        </Button>
    {/snippet}
</Tooltip>`;

const delayCode = `${script("import { Button, Tooltip } from '@sveltique/components';")}

<Tooltip title="Hi !" delay={0}>
    {#snippet children({ props, ref })}
        <Button bind:ref={ref.current} {...props}>
            My tooltip appears instantly
        </Button>
    {/snippet}
</Tooltip>`;

const arrowCode = `${script("import { Button, Tooltip } from '@sveltique/components';")}

<Tooltip title="I don't have an arrow..." arrow={false}>
    {#snippet children({ props, ref })}
        <Button bind:ref={ref.current} {...props}>
            Hover me
        </Button>
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
</script>

<h1 id="tooltip">Tooltip</h1>
<p>Display informative text when users hover or focus an element.</p>
<Alert class="mb-4">
    You must have <Link href="https://floating-ui.com/docs/getting-started#vanilla" external>@floating-ui/dom</Link>
    installed to use this component (see <Link href="/docs/components/getting-started/installation#@floating-ui/dom">
        Installation
    </Link>).
</Alert>

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

<h2 id="customization">Customization</h2>

<h3 id="placement">Placement</h3>
<p>
    Change the placement of the tooltip using the <Badge variant="secondary">placement</Badge> attribute.
</p>
<Alert class="mb-4">
    See <Link href="https://floating-ui.com/docs/computePosition#placement" external>all supported placements</Link>.
</Alert>
<Playground code={placementCode} class="flex flex-col">
    <Field label="Placement" class="w-auto">
        {#snippet input({ props })}
            <Select.Root bind:value={placement} class="w-40" {...props}>
                {#each placements as placement (placement)}
                    <Select.Option value={placement} />
                {/each}
            </Select.Root>
        {/snippet}
    </Field>
    
	<Tooltip title="I'm a {placement} tooltip" {placement}>
		{#snippet children({ props, ref })}
			<Button bind:ref={ref.current} {...props}>Hover me</Button>
		{/snippet}
	</Tooltip>
</Playground>

<h3 id="placement">Delay</h3>
<p>
    You can change the delay before showing the tooltip using the <Badge variant="secondary">delay</Badge>
    attribute.
</p>
<Playground code={delayCode}>
	<Tooltip title="Hi !" delay={0}>
		{#snippet children({ props, ref })}
			<Button bind:ref={ref.current} {...props}>My tooltip appears instantly</Button>
		{/snippet}
	</Tooltip>
</Playground>

<h3 id="arrow">Arrow</h3>
<p>You can hide the arrow using the <Badge variant="secondary">arrow</Badge> attribute.</p>
<Playground code={arrowCode}>
	<Tooltip title="I don't have an arrow..." arrow={false}>
		{#snippet children({ props, ref })}
			<Button bind:ref={ref.current} {...props}>Hover me</Button>
		{/snippet}
	</Tooltip>
</Playground>

<h2 id="accessibility">Accessibility</h2>

<h3 id="linking-with-the-content">Linking with the content</h3>
<p>
	To make the tooltip accessible, it must be linked to the item it describes. For this, pass down
	the tooltip's ID by using the <Badge variant="secondary">props</Badge> parameter.
</p>
<CodeBlock code={accessibleCode} />

<h3 id="keyboard-interactions">Keyboard Interactions</h3>
<Table.Root>
    <Table.Head>
        <Table.Row>
            <Table.Header>Key</Table.Header>
            <Table.Header>Description</Table.Header>
        </Table.Row>
    </Table.Head>
    <Table.Body>
        <Table.Row>
            <Table.Cell><Kbd>Tab</Kbd></Table.Cell>
            <Table.Cell><p>Open / closes the tooltip without delay.</p></Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Space</Kbd></Table.Cell>
            <Table.Cell><p>Closes the tooltip.</p></Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Enter</Kbd></Table.Cell>
            <Table.Cell><p>Closes the tooltip.</p></Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Escape</Kbd></Table.Cell>
            <Table.Cell><p>Closes the tooltip.</p></Table.Cell>
        </Table.Row>
    </Table.Body>
</Table.Root>
