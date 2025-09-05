<script module>
export const metadata = {
	description:
		"A styled, accessible dropdown replacement for the native select element, ensuring consistent appearance and behavior across browsers."
};
</script>

<script lang="ts">
import { Alert, Badge, Select } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const fruits = ["Apple", "Banana", "Mango", "Kiwi"];

const code = {
	short: `<Select.Root
    placeholder="Select a fruit"
    containerClass="w-40"
>
    {#each fruits as fruit}
        <Select.Option value={fruit} />
    {/each}
</Select.Root>`,
	expanded: `${script(`import { Select } from '@sveltique/components';

    const fruits = ['Apple', 'Banana', 'Mango', 'Kiwi'];`)}

<Select.Root
    placeholder="Select a fruit"
    containerClass="w-40"
>
    {#each fruits as fruit}
        <Select.Option value={fruit} />
    {/each}
</Select.Root>`
};
</script>

<h1 id="select">Select</h1>
<p>
    A styled, accessible dropdown replacement for the native <code>select</code> element, ensuring
	consistent appearance and behavior across browsers.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<Alert type="info" class="mb-4">
	To prevent the select from changing size when choosing options with different length, set a fixed
    width on the container using <Badge variant="secondary">containerClass</Badge>.
</Alert>
<Playground {code}>
	<Select.Root placeholder="Select a fruit" containerClass="w-40">
		{#each fruits as fruit}
			<Select.Option value={fruit} />
		{/each}
	</Select.Root>
</Playground>
