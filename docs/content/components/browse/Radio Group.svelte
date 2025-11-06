<script module>
export const metadata = {
	description:
		"A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time."
};
</script>

<script lang="ts">
import { Label, Link, RadioGroup } from "@sveltique/components";
import Playground from "$lib/components/Playground.svelte";
import { script } from '$utils/playground';
    import { Table } from "$components/table";

    let value = $state("")

    $inspect(value)

const basicUsageCode = `${script('import { Label, RadioGroup } from "@sveltique/components";')}

<fieldset class="p-4 border border-muted w-52">
    <legend class="bg-foreground px-2 text-background">Choose an animal</legend>
    <RadioGroup.Root bind:value name="animals" class="flex flex-col gap-1">
        <div class="flex items-center gap-4">
            <RadioGroup.Item value="cat" id="cat" />
            <Label for="cat">Cat</Label>
        </div>
        <div class="flex items-center gap-4">
            <RadioGroup.Item value="dog" id="dog" />
            <Label for="dog">Dog</Label>
        </div>
        <div class="flex items-center gap-4">
            <RadioGroup.Item value="snake" id="snake" />
            <Label for="snake">Snake</Label>
        </div>
    </RadioGroup.Root>
</fieldset>`;

/* const exampleOneCode = `${script('import { RadioGroup.Root } from "@sveltique/components";')}

<RadioGroup.Root />`; */
</script>

<h1 id="component">RadioGroup.Root</h1>
<p>
    A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the
    buttons can be checked at a time.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode} class="flex-col">
    <fieldset class="p-4 border border-muted w-52">
        <legend class="bg-foreground px-2 text-background">Choose an animal</legend>
        <RadioGroup.Root bind:value name="animals" class="flex flex-col gap-1">
            <div class="flex items-center gap-4">
                <RadioGroup.Item value="cat" id="cat" />
                <Label for="cat">Cat</Label>
            </div>
            <div class="flex items-center gap-4">
                <RadioGroup.Item value="dog" id="dog" />
                <Label for="dog">Dog</Label>
            </div>
            <div class="flex items-center gap-4">
                <RadioGroup.Item value="snake" id="snake" />
                <Label for="snake">Snake</Label>
            </div>
        </RadioGroup.Root>
    </fieldset>
</Playground>

<h2 id="structure">Structure</h2>
<Table.Root>
    <Table.Head>
        <Table.Row>
            <Table.Header>Component</Table.Header>
            <Table.Header>Description</Table.Header>
        </Table.Row>
    </Table.Head>
    <Table.Body>
        <Table.Row>
            <Table.Cell>RadioGroup.Root</Table.Cell>
            <Table.Cell>The root container, managing the state of the radio group.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>RadioGroup.Item</Table.Cell>
            <Table.Cell>An individual checkable radio button.</Table.Cell>
        </Table.Row>
    </Table.Body>
</Table.Root>

<h2 id="accessibility">Accessibility</h2>
<p>
    Conforms to the <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/radio" external>WAI ARIA Radio Group design pattern</Link>.
</p>

<!-- [OPTIONAL] Always useful to demonstrate the component in a relevant context. -->
<!-- <h2 id="examples">Examples</h2>

<h3 id="example-one">Example One</h3>
<Playground code={exampleOneCode}>
    <RadioGroup.Root />
</Playground>
 -->