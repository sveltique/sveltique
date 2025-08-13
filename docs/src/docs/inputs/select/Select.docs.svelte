<script lang="ts">
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Badge, Alert, Select } from '@sveltique/components';

	const fruits = ['Apple', 'Banana', 'Mango', 'Kiwi'];

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

<h1>Select</h1>
<p>A dropdown.</p>
<h2>Basic Usage</h2>
<p>
	It is meant to be used as a drop-in replacement for the native select element, and ensures the
	styles are uniform through the different browsers.
</p>
<Alert type="info" class="mb-4">
	To prevent the select from changing size, set a fixed width on the container using <Badge
		>containerClass
	</Badge>.
</Alert>
<Playground {code}>
	<Select.Root placeholder="Select a fruit" containerClass="w-40">
		{#each fruits as fruit}
			<Select.Option value={fruit} />
		{/each}
	</Select.Root>
</Playground>
