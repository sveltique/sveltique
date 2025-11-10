<script module>
export const metadata = {
	description:
		"Provides a consistent structure for form controls by integrating a label, helper text, and error message when supplied."
};
</script>

<script lang="ts">
import {
	Alert,
	Badge,
	Checkbox,
	Field,
	Kbd,
	Label,
	Link,
	NumberInput,
	Switch,
	TextInput
} from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { theme } from "$lib/contexts/theme.svelte";
import { script } from "$utils/playground";
import { Table } from "$components/table";

let checked = $state(false)

let password = $state("")
let passwordErrors = $derived.by(() => {
    const errors = [];

    if (password.length < 8) {
        errors.push("Must have at least 8 characters.")
    }

    if (!/[#$%^&()]/.test(password)) {
        errors.push("Must contain at least one special character.")
    }

    return errors;
})

let age = $state(16);
let ageError = $derived.by(() => {
	if (age < 18) {
		return "You must be at least 18 years old to participate.";
	}
});

$effect(() => {
    theme.setDarkTheme(theme.isDark);
})

const basicUsageCode = `${script('import { Field, TextInput } from "@sveltique/components";')}

<Field
    label="Full Name"
    class="max-w-3xs"
>
    <!-- props: {
        id: string;
        "aria-invalid": boolean;
        "aria-describedby": string | undefined;
    } -->
    {#snippet input({ props })}
        <TextInput {...props} />
    {/snippet}
</Field>`;

const errorMessageCode = `${script(`import { Field, NumberInput } from '@sveltique/components';

    let age = $state(18);
    let ageError = $derived.by(() => {
        if (age < 16 || age > 25) {
            return 'You must be between 16 and 25 years old to participate.';
        }
    });`)}

<Field
    label="Age"
    error={ageError}
    class="max-w-3xs"
>
    {#snippet input({ props })}
        <NumberInput
            bind:value={age}
            min={0}
            max={99}
            {...props}
        />
    {/snippet}
</Field>`;

const helperTextCode = `${script('import { Field, TextInput } from "@sveltique/components";')}

<Field
    label="Password"
    helper="Must be at least 8 characters"
    class="max-w-3xs"
>
    {#snippet input({ props })}
        <TextInput type="password" {...props} />
    {/snippet}
</Field>`

const placementCode = `${script('import { Checkbox, Field, Switch } from "@sveltique/components";')}

<Field
    label="Switch to dark theme"
    placement="left"
>
    {#snippet input({ props })}
        <Switch
            checked={theme.isDark}
            ontoggle={(checked) => theme.setDarkTheme(checked)}
            {...props}
        />
    {/snippet}
</Field>
<Field
    label="I have read the Terms of Services."
    placement="right"
>
    {#snippet input({ props })}
        <Checkbox {...props} />
    {/snippet}
</Field>`;
</script>

<h1 id="field">Field</h1>
<p>
    Provides a consistent structure for form controls by integrating a label, helper text, and error
    message when supplied.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>
	A field takes an <Badge variant="secondary">input</Badge> snippet, exposing props for accessibility
    purposes.
</p>
<p>
    You can use any input element, or custom ones such as <Link href="/docs/components/browse/text-input">
        Text Input
    </Link>, <Link href="/docs/components/browse/number-input">Number Input</Link> or <Link href="/docs/components/browse/select">
        Select
    </Link>.
</p>
<Playground code={basicUsageCode}>
    <Field.Root class="max-w-3xs">
        <Label for="full-name">Full name</Label>
        <TextInput id="full-name" />
	</Field.Root>
</Playground>

<h3 id="error-message">Error Message</h3>
<p>
    You can show an error message under the field by setting the <Badge variant="secondary">error</Badge>
    property.
</p>
<Alert class="mb-4">
    In production code, you would receive the error from a validation library instead of defining
    it manually like in this example.
</Alert>
<Playground code={errorMessageCode} class="flex-col">
	<Field.Root class="max-w-3xs">
        <Label for="age">Age</Label>
        <NumberInput id="age" bind:value={age} min={0} max={99} />
        {#if ageError}
            <Field.Error>{ageError}</Field.Error>
        {/if}
	</Field.Root>
    <p class="text-muted-foreground text-sm italic">
        Try setting the age above 18 to make the error disappear.
    </p>
</Playground>

<h3 id="helper-text">Helper text</h3>
<p>
    You can show a helper text under the field by setting the <Badge variant="secondary">helper</Badge>
    property.
</p>
<Playground code={helperTextCode} class="flex-col">
	<Field.Root class="max-w-3xs">
        <Label for="password">Password</Label>
        <Field.Helper>Must be at least 8 characters</Field.Helper>
        <TextInput id="password" type="password" />
	</Field.Root>
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
            <Table.Cell><Kbd>Field.Root</Kbd></Table.Cell>
            <Table.Cell>The root container of the field.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Field.Helper</Kbd></Table.Cell>
            <Table.Cell>A helper text for the field.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Field.Error</Kbd></Table.Cell>
            <Table.Cell>Error(s) for the field.</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell><Kbd>Field.Content</Kbd></Table.Cell>
            <Table.Cell>Vertical grouping for content.</Table.Cell>
        </Table.Row>
    </Table.Body>
</Table.Root>

<h2 id="customization">Customization</h2>

<h3 id="placement">Orientation</h3>
<p>
    By default, the label appears on top of the input. However, in somes cases, such as with switches
    or checkboxes, you may want to place the label differently.
</p>
<p>You have two orientation options : vertical (default), and horizontal.</p>
<Playground code={placementCode}>
    <div class="relative flex flex-col items-center gap-6">
        <Field.Root orientation="horizontal">
            <Label for="dark-theme">Switch to dark theme</Label>
            <Switch
                id="dark-theme"
                checked={theme.isDark}
            />
        </Field.Root>
        <Field.Root orientation="horizontal">
            <Checkbox id="tos-1" />
            <Label for="tos-1">I have read the Terms of Services.</Label>
        </Field.Root>
    </div>
</Playground>

<h2 id="examples">Examples</h2>

<h3 id="complete-field">Complete field</h3>
<p>Usage of a complete field, i.e. using all the components.</p>
<Playground>
    <Field.Root orientation="horizontal" class="max-w-3xs">
        <Checkbox id="tos-2" bind:checked />
        <Field.Content>
            <Label for="tos-2">I have read the Terms of Services.</Label>
            <Field.Helper>Make sure that you have read everything.</Field.Helper>
            {#if !checked}
                <Field.Error>You must check this.</Field.Error>
            {/if}
        </Field.Content>
    </Field.Root>
</Playground>

<h3 id="multiple-errors">Multiple errors</h3>
<Playground>
    <Field.Root class="max-w-3xs">
        <Label for="password">Password</Label>
        <TextInput bind:value={password} id="password" type="password" />
        {#if passwordErrors.length}
            <ul class="flex flex-col gap-1">
                {#each passwordErrors as error, index (index)}
                    <li>
                        <Field.Error>{error}</Field.Error>
                    </li>
                {/each}
            </ul>
        {/if}
    </Field.Root>
</Playground>
