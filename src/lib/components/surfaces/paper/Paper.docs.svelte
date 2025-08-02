<script lang="ts">
	import Paper from './Paper.svelte';
	import Playground from '$docs/Playground.svelte';
	import type { PaperVariants } from './variant.js';
	import Field from '$lib/components/inputs/field/Field.svelte';

	let elevation = $state<PaperVariants['elevation']>(1);
</script>

<h1>Paper</h1>
<p>A surface to display content and actions.</p>
<Playground>
	<Paper {elevation}>hi</Paper>

	{#snippet controls()}
		<Field label="Elevation"></Field>
	{/snippet}
</Playground>
