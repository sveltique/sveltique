<script module>
export const metadata = {
	description: "Displays content on top of another."
};
</script>

<script lang="ts">
import { Badge, Field, Kbd, Link, Popover, Switch } from "@sveltique/components";
import { Table } from "$components/table";
import Playground from "$lib/components/Playground.svelte";
import { script } from "$utils/playground";
import CodeBlock from "$components/CodeBlock.svelte";

type Preference = { label: string; slug: string; checked: boolean };

let preferences = $state<Preference[]>([
	{
        slug: "product-updates",
        label: "Product updates",
		checked: true
	},
	{
        slug: "weekly-newsletters",
		label: "Weekly newsletters",
		checked: true
	},
	{
        slug: "promotions-and-offers",
		label: "Promotions and offers",
		checked: true
	}
]);

const basicUsageCode = `${script(`import { Field, Popover, Switch } from "@sveltique/components";

    type Preference = {
        label: string;
        slug: string;
        checked: boolean
    };

    let preferences = $state<Preference[]>([
        {
            slug: "product-updates",
            label: "Product updates",
            checked: true
        },
        {
            slug: "weekly-newsletters",
            label: "Weekly newsletters",
            checked: true
        },
        {
            slug: "promotions-and-offers",
            label: "Promotions and offers",
            checked: true
        }
    ]);`)}

<Popover.Root>
    <Popover.Trigger>Notification preferences</Popover.Trigger>
    <Popover.Content class="space-y-6">
        <div class="flex flex-col">
            <h3>Notification preferences</h3>
            <p class="text-muted-foreground text-sm">
                Set your preferences for the application.
            </p>
        </div>
        <div class="space-y-3">
            {#each preferences as preference (preference.slug)}
                <Field
                    label={preference.label}
                    placement="left"
                    controlProps={{ class: "justify-between" }}
                >
                    {#snippet input({ props })}
                        <Switch
                            bind:checked={preference.checked}
                            {...props}
                        />
                    {/snippet}
                </Field>
            {/each}
        </div>
    </Popover.Content>
</Popover.Root>`;

const arrowCode = `${script('import { Popover } from "@sveltique/components";')}

<Popover.Root>
    <Popover.Trigger>Open me</Popover.Trigger>
    <Popover.Content>
        <p>I have an arrow !</p>
        <Popover.Arrow />
    </Popover.Content>
</Popover.Root>`

const controlledStateCode = `${script(`import { Popover } from "@sveltique/components";

    let open = $state(false);`)}

<Popover.Root bind:open>
    ...
</Popover.Root>`
</script>

<h1 id="component">Popover</h1>
<p>Displays content on top of another.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
    <Popover.Root>
        <Popover.Trigger>Notification preferences</Popover.Trigger>
        <Popover.Content class="space-y-6">
            <div class="flex flex-col">
                <h3>Notification preferences</h3>
                <p class="text-muted-foreground text-sm">Set your preferences for the application.</p>
            </div>
            <div class="space-y-3">
                {#each preferences as preference (preference.slug)}
                    <Field
                        label={preference.label}
                        placement="left"
                        controlProps={{ class: "justify-between" }}
                    >
                        {#snippet input({ props })}
                            <Switch bind:checked={preference.checked} {...props} />
                        {/snippet}
                    </Field>
                {/each}
            </div>
        </Popover.Content>
    </Popover.Root>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="arrow">Arrow</h3>
<p>
    You can add an arrow to the content using the <Badge variant="secondary">Popover.Arrow</Badge> component.
</p>
<Playground code={arrowCode}>
	<Popover.Root>
        <Popover.Trigger>Open me</Popover.Trigger>
        <Popover.Content>
            <p>I have an arrow !</p>
            <Popover.Arrow />
        </Popover.Content>
    </Popover.Root>
</Playground>

<h3 id="close">Close</h3>
<p>
    You can add a close button to the content using the <Badge variant="secondary">Popover.Close</Badge>
    component.
</p>
<Playground code={arrowCode}>
	<Popover.Root>
        <Popover.Trigger>Open me</Popover.Trigger>
        <Popover.Content class="w-80">
            <p>I have a close button !</p>
            <Popover.Close />
        </Popover.Content>
    </Popover.Root>
</Playground>

<h2 id="controlled-state">Controlled state</h2>
<p>Use the <Badge variant="secondary">open</Badge> property to control the popover.</p>
<CodeBlock code={controlledStateCode} />

<h2 id="structure">Structure</h2>
<Table.Root>
    <Table.Head>
        <Table.Header>Component</Table.Header>
        <Table.Header>Description</Table.Header>
    </Table.Head>
    <Table.Body>
        <Table.Row>
            <Table.Cell><Badge variant="secondary">Popover.Root</Badge></Table.Cell>
            <Table.Cell>Manages the popover state and focus management.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Badge variant="secondary">Popover.Trigger</Badge></Table.Cell>
            <Table.Cell>The trigger of the popover.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Badge variant="secondary">Popover.Content</Badge></Table.Cell>
            <Table.Cell>The content of the popover.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Badge variant="secondary">Popover.Arrow</Badge> (Optional)</Table.Cell>
            <Table.Cell>When added inside the content, it will point an arrow towards the trigger.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Badge variant="secondary">Popover.Close</Badge> (Optional)</Table.Cell>
            <Table.Cell>When added inside the content, it will create a close button.</Table.Cell>
        </Table.Row>
    </Table.Body>
</Table.Root>

<h2 id="accessibility">Accessibility</h2>
<p>
    Conforms to the <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal" external>WAI-ARIA Dialog design pattern</Link>.
</p>

<h3 id="dialog-title">Popover title</h3>
<p>
    To make your popover more accessible, you should set on your <Badge variant="secondary">Popover.Content</Badge>
    either :
</p>
<ul>
    <li>The <Badge variant="secondary">aria-labelledby</Badge> property that refers to a visible title.</li>
    <li>A label specified by <Badge variant="secondary">aria-label</Badge>.</li>
</ul>

<h3 id="keyboard-interactions">Keyboard Interactions</h3>
<Table.Root>
    <Table.Head>
        <Table.Header>Key</Table.Header>
        <Table.Header>Description</Table.Header>
    </Table.Head>
    <Table.Body>
        <Table.Row>
            <Table.Cell><Kbd>Escape</Kbd></Table.Cell>
            <Table.Cell>When open, closes the popover and focuses the trigger.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Space</Kbd></Table.Cell>
            <Table.Cell>When focusing the trigger, open / closes the popover.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Enter</Kbd></Table.Cell>
            <Table.Cell>When focusing the trigger, open / closes the popover.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Tab</Kbd></Table.Cell>
            <Table.Cell>Focuses the next element and loops back if necessary.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Shift + Tab</Kbd></Table.Cell>
            <Table.Cell>Focuses the previous element and loops back if necessary.</Table.Cell>
        </Table.Row>
    </Table.Body>
</Table.Root>
