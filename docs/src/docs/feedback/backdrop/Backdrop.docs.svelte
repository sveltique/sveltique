<script>
	import Playground from '$components/Playground.svelte';
	import { Backdrop, Button } from '@sveltique/components';
	import { code } from './content';

	let showBackdrop = $state(false);
</script>

<h1>Backdrop</h1>
<p>
	Narrows the user's focus to a particular element on the screen by adding a dimmed layer over your
	application.
</p>

<h2>Basic Usage</h2>
<Playground {code}>
	<Button onclick={() => (showBackdrop = true)}>Show backdrop</Button>

	{#if showBackdrop}
		<Backdrop onClick={() => (showBackdrop = false)} z={1000} />
	{/if}
</Playground>
