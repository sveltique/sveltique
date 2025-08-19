<script>
	import { Backdrop, Button } from '@sveltique/components';
	import Playground from '$components/Playground.svelte';
	import { onKeyUp } from '$utils/on-key-up.svelte';
	import { script } from '$utils/playground';

	let showBackdrop = $state(false);

	onKeyUp('Escape', () => (showBackdrop = false));

	const code = {
		short: `<Button onclick={() => (showBackdrop = true)}>
    Show backdrop
</Button>

{#if showBackdrop}
    <Backdrop
        onClick={() => (showBackdrop = false)}
        z={1000}
    />
{/if}`,
		expanded: `${script(`import { Backdrop, Button } from '@sveltique/components';

    let showBackdrop = $state(false);`)}

<Button onclick={() => (showBackdrop = true)}>
    Show backdrop
</Button>

{#if showBackdrop}
    <Backdrop
        onClick={() => (showBackdrop = false)}
        z={1000}
    />
{/if}`
	};
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
