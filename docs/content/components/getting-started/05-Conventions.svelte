<script lang="ts">
import { Badge } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import { script } from "$utils/playground";

const refCode = `${script(`import { Button } from "@sveltique/components";

    let buttonRef = $state<HTMLButtonElement>();`)}
    
<Button bind:ref={buttonRef}>
    I'm a button !
</Button>`;

const propertiesCode = `${script(`import { Select } from '@sveltique/components';

    const fruits = ["Apple", "Banana", "Kiwi", "Mango"] as const;`)}

<Select.Root
    placeholder="Select a fruit"
    containerProps={{ class: "w-40" }}
>
    {#each fruits as fruit (fruit)}
        <Select.Option value={fruit} />
    {/each}
</Select.Root>`;
</script>

<svelte:head>
    <title>Conventions - sveltique/components</title>
    <meta name="description" content="Learn about some conventions used in Sveltique." />
</svelte:head>

<h1 id="conventions">Conventions</h1>
<p>Learn about some conventions used in Sveltique.</p>

<h2 id="ref-attribute">Ref attribute</h2>
<p>
    Every Sveltique component exposes a <Badge variant="secondary">ref</Badge> attribute, giving you
    direct access to the component's root element.
</p>
<CodeBlock code={refCode} />

<h2 id="classes">Properties</h2>
<p>
    Every component accepts properties. For components that render a single element (which is most of
    them), these properties are applied directly to that element.
</p>
<p>
    For more complex components, properties are applied to the most relevant element. To pass properties
    to the root element instead, these components provide a <Badge variant="secondary">containerProps</Badge>
    property.
</p>
<CodeBlock code={propertiesCode} />
