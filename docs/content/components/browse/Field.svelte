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
	Link,
	NumberInput,
	Switch,
	TextInput
} from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { theme } from "$lib/contexts/theme.svelte";
import { script } from "$utils/playground";

let age = $state(16);
let ageError = $derived.by(() => {
	if (age < 18) {
		return "You must be at least 18 years old to participate.";
	}
});

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
    <Field label="Full Name" class="max-w-3xs">
		{#snippet input({ props })}
			<TextInput {...props} />
		{/snippet}
	</Field>
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
	<Field label="Age" error={ageError} class="max-w-3xs">
		{#snippet input({ props })}
			<NumberInput bind:value={age} min={0} max={99} {...props} />
		{/snippet}
	</Field>
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
	<Field label="Password" helper="Must be at least 8 characters" class="max-w-3xs">
		{#snippet input({ props })}
			<TextInput type="password" {...props} />
		{/snippet}
	</Field>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="placement">Label Placement</h3>
<p>
    By default, the label appears on top of the input. However, in somes cases, such as with switches
    or checkboxes, you may want to place the label differently.
</p>
<p>You have three placement options : top (default), left and right.</p>
<Playground code={placementCode}>
    <div class="relative flex flex-col items-center gap-6">
        <Field label="Switch to dark theme" placement="left">
            {#snippet input({ props })}
                <Switch
                    checked={theme.isDark}
                    ontoggle={(checked) => theme.setDarkTheme(checked)}
                    {...props}
                />
            {/snippet}
        </Field>
        <Field label="I have read the Terms of Services." placement="right">
            {#snippet input({ props })}
                <Checkbox {...props} />
            {/snippet}
        </Field>
    </div>
</Playground>
