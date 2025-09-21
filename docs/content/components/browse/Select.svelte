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

let fruitId = $state<string>()

const fruits = ["Apple", "Banana", "Kiwi", "Mango"] as const;

const mappedFruits: Record<string, typeof fruits[number]> = {
    "df3ka": "Apple",
    "o23cc": "Banana",
    "al09r": "Kiwi",
    "20kl3": "Mango",
};

const activeFruits: Record<typeof fruits[number], boolean> = {
    "Apple": true,
    "Banana": true,
    "Kiwi": false,
    "Mango": true,
}

const basicUsageCode = `${script(`import { Select } from '@sveltique/components';

    const fruits = ["Apple", "Banana", "Kiwi", "Mango"] as const;`)}

<Select.Root
    placeholder="Select a fruit"
    containerClass="w-40"
>
    {#each fruits as fruit (fruit)}
        <Select.Option value={fruit} />
    {/each}
</Select.Root>`;

const customLabelsCode = `${script(`import { Select } from '@sveltique/components';

    const fruits: Record<string, string> = {
        "df3ka": "Apple",
        "o23cc": "Banana",
        "al09r": "Kiwi",
        "20kl3": "Mango"
    };`)}

<Select.Root
    placeholder="Select a fruit"
    containerClass="w-40"
>
    {#each Object.entries(fruits) as [id, fruit] (id)}
        <Select.Option value={id}>
            {fruit} ({id})
        </Select.Option>
    {/each}
</Select.Root>`;

const disablingOptionsCode = `${script(`import { Select } from '@sveltique/components';

    const activeFruits: Record<string, boolean> = {
        "Apple": true,
        "Banana": true,
        "Kiwi": false,
        "Mango": true,
    };`)}

<Select.Root
    placeholder="Select a fruit"
    containerClass="w-40"
>
    {#each Object.entries(activeFruits) as [fruit, active] (fruit)}
        <Select.Option
            value={fruit}
            disabled={!active}
        />
    {/each}
</Select.Root>`;
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
<Playground code={basicUsageCode}>
	<Select.Root placeholder="Select a fruit" containerClass="w-40">
		{#each fruits as fruit (fruit)}
			<Select.Option value={fruit} />
		{/each}
	</Select.Root>
</Playground>

<h3 id="custom-labels">Custom labels</h3>
<p>
    By default, <Badge variant="secondary">Select.Option</Badge> uses the <Badge variant="secondary">
        value
    </Badge> as the option's label.
</p>
<p>
    To display a different label, pass custom content as <Badge variant="secondary">children</Badge>.
</p>
<Playground code={customLabelsCode} class="flex-col">
    <p>Select value : {fruitId}</p>
    <Select.Root bind:value={fruitId} placeholder="Select a fruit" containerClass="w-40">
		{#each Object.entries(mappedFruits) as [id, fruit] (id)}
			<Select.Option value={id}>
                {fruit} ({id})
            </Select.Option>
		{/each}
	</Select.Root>
</Playground>

<h3 id="disabling-options">Disabling options</h3>
<p>
    You can disable an option using the <Badge variant="secondary">disabled</Badge> property.
</p>
<Playground code={disablingOptionsCode}>
    <Select.Root placeholder="Select a fruit" containerClass="w-40">
        {#each Object.entries(activeFruits) as [fruit, active] (fruit)}
            <Select.Option value={fruit} disabled={!active} />
        {/each}
	</Select.Root>
</Playground>
