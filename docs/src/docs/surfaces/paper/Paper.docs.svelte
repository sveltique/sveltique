<script lang="ts">
	import Playground from '$components/Playground.svelte';
	import { Paper } from '@novaotp/components';
</script>

<h1>Paper</h1>
<p>A surface to display content and actions.</p>
<Playground>
	<Paper class="flex flex-col gap-3 p-6">
		<p class="p-0 text-lg font-bold">A fully customizable paper</p>
		<p class="p-0">It's simply a styled div under the hood.</p>
	</Paper>
</Playground>
