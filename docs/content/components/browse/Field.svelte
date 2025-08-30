<script module>
export const metadata = {
	description:
		"Provides a consistent structure for form controls, by including a label and an error message when provided."
};
</script>

<script lang="ts">
import { Alert, Field, Link, NumberInput, TextInput } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
    import { script } from "$utils/playground";

type Input = "text" | "number" | "select";

let age = $state(16);
let ageError = $derived.by(() => {
	if (age < 18) {
		return "You must be at least 18 years old to participate.";
	}
});

const basicUsageCode = `${script('import { Field, TextInput } from "@sveltique/components";')}

<Field label="Full Name" class="w-[200px]">
    {#snippet input(props)}
        <TextInput {...props} />
    {/snippet}
</Field>`

const ageCode = `${script(`import { Field, NumberInput } from '@sveltique/components';

    let age = $state(18);
    let ageError = $derived.by(() => {
        if (age < 16 || age > 25) {
            return 'You must be between 16 and 25 years old to participate.';
        }
    });`)}

<Field label="Age" error={ageError} class="w-[240px]">
    {#snippet input(props)}
        <NumberInput
            bind:value={age}
            min={0}
            max={99}
            {...props}
        />
    {/snippet}
</Field>`
</script>

<h1 id="field">Field</h1>
<p>Provides a consistent structure for form controls, by including a label and an error message when provided.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>
	The <code>{'<Field />'}</code> accepts any input element, or custom ones such as <Link href="/docs/components/browse/text-input">
        {'<TextInput />'}
    </Link>, <Link href="/docs/components/browse/number-input">{'<NumberInput />'}</Link> or <Link href="/docs/components/browse/select">
        {'<Select />'}
    </Link>.
</p>
<Playground code={basicUsageCode}>
    <Field label="Full Name" class="w-[200px]">
		{#snippet input(props)}
			<TextInput {...props} />
		{/snippet}
	</Field>
</Playground>

<h3 id="error">Error</h3>
<p>You can show an error message under the field by setting the error property.</p>
<Alert class="mb-4">
    In production code, you would receive the error from a validation library instead of defining
    it manually like in this example.
</Alert>
<Playground code={ageCode} class="flex-col">
	<Field label="Age" error={ageError} class="w-[240px]">
		{#snippet input(props)}
			<NumberInput bind:value={age} min={0} max={99} {...props} />
		{/snippet}
	</Field>
    <p class="text-sm italic text-muted-foreground">
        Try setting the age above 18 to make the error disappear.
    </p>
</Playground>
