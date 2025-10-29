<script module>
export const metadata = {
	description:
		"Narrows the user's focus to a particular element on the screen by adding a dimmed layer over your application."
};
</script>

<script>
import { Backdrop, Button } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

let showBackdrop = $state(false);

const code = `${script(`import { Backdrop, Button } from '@sveltique/components';

    let showBackdrop = $state(false);`)}

<Button onclick={() => (showBackdrop = true)}>
    Show backdrop
</Button>

{#if showBackdrop}
    <Backdrop
        onclick={() => (showBackdrop = false)}
        z={1000}
    />
{/if}`;
</script>

<h1 id="backdrop">Backdrop</h1>
<p>
	Narrows the user's focus to a particular element on the screen by adding a dimmed layer over your
	application.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code}>
	<Button onclick={() => (showBackdrop = true)}>Show backdrop</Button>

	{#if showBackdrop}
		<Backdrop onclick={() => (showBackdrop = false)} z={1000} />
	{/if}
</Playground>
