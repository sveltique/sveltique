<script lang="ts">
	import { Paper, Select } from '@novaotp/components';

	const fruits = ['apple', 'banana', 'mango', 'kiwi'];
</script>

<h1>Select</h1>
<p>A dropdown.</p>
<h2>Basic Usage</h2>
<p>
	It is meant to be used as a drop-in replacement for the native select element, and ensures the
	styles are uniform through the different browsers.
</p>
<Paper variant="outline" class="flex justify-center p-6">
	<Select.Root value="apple" containerClass="w-24">
		<Select.Option value="" selected disabled>Select a fruit</Select.Option>
		{#each fruits as fruit}
			<Select.Option value={fruit} />
		{/each}
	</Select.Root>
</Paper>
