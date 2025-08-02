<script lang="ts">
	import NumberInput from './NumberInput.svelte';
	import Paper from '$lib/components/surfaces/paper/Paper.svelte';
</script>

<h1>Number Input</h1>
<p>Number Inputs allow users to enter text into a UI.</p>
<h2>Basic Usage</h2>
<p>
	The Number Input is a text NumberInput, and includes a label and an error message when provided.
</p>
<Paper variant="outline" class="flex justify-center p-6">
	<NumberInput step={1} value={50} min={0} max={100} containerClass="max-w-3xs" />
</Paper>
