<script module>
export const metadata = {
	description:
		"A multi-cell input component for entering one-time passwords (OTP) or verification codes, with pasting functionality."
};
</script>

<script lang="ts">
import { Badge, Kbd, OTP } from "@sveltique/components";
import IconPointFilled from "@tabler/icons-svelte/icons/point-filled";
import Playground from "$components/Playground.svelte";
import { Table } from "$components/table";
import { script } from "$utils/playground";

let value = $state("");

const basicUsageCode = `${script('import { OTP } from "@sveltique/components";')}

<OTP.Root length={6}>
    {#each { length: 6 } as _, index (index)}
        <OTP.Cell {index} />
    {/each}
</OTP.Root>`;

const groupsCode = `${script(`import { OTP } from "@sveltique/components";
    import IconPointFilled from "@tabler/icons-svelte/icons/point-filled";`)}

<OTP.Root length={6} class="gap-4">
    <OTP.Group>
        <OTP.Cell index={0} />
        <OTP.Cell index={1} />
        <OTP.Cell index={2} />
    </OTP.Group>
    <IconPointFilled aria-hidden="true" class="text-muted-foreground" />
    <OTP.Group>
        <OTP.Cell index={3} />
        <OTP.Cell index={4} />
        <OTP.Cell index={5} />
    </OTP.Group>
</OTP.Root>`
</script>

<h1 id="otp">OTP</h1>
<p>A multi-cell input component for entering one-time passwords (OTP) or verification codes, with pasting functionality.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode} class="flex-col">
    <OTP.Root bind:value length={6}>
        {#each { length: 6 } as _, index (index)}
            <OTP.Cell {index} />
        {/each}
    </OTP.Root>
    <p class="text-sm">Current value: {value}</p>
</Playground>

<h2 id="groups">Groups</h2>
<p>You can group cells using <Badge variant="secondary">OTP.Group</Badge>.</p>
<Playground code={groupsCode} class="flex-col">
    <OTP.Root length={6} class="gap-4">
        <OTP.Group>
            <OTP.Cell index={0} />
            <OTP.Cell index={1} />
            <OTP.Cell index={2} />
        </OTP.Group>
        <IconPointFilled aria-hidden="true" class="text-muted-foreground" />
        <OTP.Group>
            <OTP.Cell index={3} />
            <OTP.Cell index={4} />
            <OTP.Cell index={5} />
        </OTP.Group>
    </OTP.Root>
</Playground>

<h2 id="accessibility">Accessibility</h2>

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
            <Table.Cell><Kbd>ArrowLeft</Kbd></Table.Cell>
            <Table.Cell><p>Navigates to the previous cell.</p></Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>ArrowRight</Kbd></Table.Cell>
            <Table.Cell><p>Navigates to the next cell.</p></Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Backspace</Kbd></Table.Cell>
            <Table.Cell><p>Deletes the current cell's value and navigate to the previous cell.</p></Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Backspace</Kbd></Table.Cell>
            <Table.Cell><p>Deletes the next cell's value.</p></Table.Cell>
        </Table.Row>
    </Table.Body>
</Table.Root>
