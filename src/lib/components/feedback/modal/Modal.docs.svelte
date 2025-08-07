<script lang="ts">
	import Playground from '$docs/Playground.svelte';
	import Button from '$lib/components/inputs/button/Button.svelte';
	import Modal from './Modal.svelte';

	let open = $state(false);
</script>

<h1>Modal</h1>
<p>
	A dialog component that interrupts the user flow to capture attention. Displays content in a
	centered overlay with a dimmed backdrop.
</p>
<h2>Basic Usage</h2>
<Playground>
	<Button onclick={() => (open = true)}>Show modal</Button>

	{#if open}
		<Modal onClose={() => (open = false)}>
			<h1 class="text-2xl font-bold">Log out</h1>
			<p>Are you sure you want to log out? You'll need to sign in again to continue.</p>

			{#snippet actions()}
				<Button onclick={() => (open = false)} variant="text">Cancel</Button>
				<Button onclick={() => (open = false)} color="danger">Log Out</Button>
			{/snippet}
		</Modal>
	{/if}
</Playground>
