<script lang="ts">
	import { code } from './content.js';
	import Playground from '$components/Playground.svelte';
	import { Skeleton } from '@novaotp/components';
</script>

<h1>Skeleton</h1>
<p>A placeholder component to display while the content is loading.</p>

<h2>Basic Usage</h2>
<p>Simply define the width and height of the skeleton.</p>
<Playground {code}>
	{@render videoLoading()}
	{@render videoLoading()}
</Playground>

{#snippet videoLoading()}
	<div class="max-w-3xs relative flex w-full flex-col items-start gap-2.5">
		<Skeleton class="h-32 w-full" />
		<Skeleton class="h-4 w-full" />
		<Skeleton class="h-4 w-1/2" />
	</div>
{/snippet}
