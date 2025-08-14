<script>
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Badge, Button, Toast } from '@sveltique/components';
</script>

<h1>Toast</h1>
<p>Briefs notification of processes that have been or will be performed.</p>

<h2>Basic Usage</h2>
<Playground
	code={{
		short: `<Toast type="success" class="max-w-96">
    Post added successfully.
</Toast>`,
		expanded: `${script("import { Toast } from '@sveltique/components';")}
    
<Toast type="success" class="max-w-96">
    Post added successfully.
</Toast>`
	}}
>
	<Toast type="success" class="max-w-96">Post added successfully.</Toast>
</Playground>

<h2>Action</h2>
<p>
	To add a close button, you can simply pass an <Badge>onClose</Badge> function. Otherwise, you can use
	the <Badge>action</Badge> snippet to add a custom action.
</p>
<Playground
	class="flex-col"
	code={{
		short: `<Toast type="warning" onClose={() => {}} class="max-w-96">
    Your session will expire soon.
</Toast>
<Toast type="info" class="max-w-96">
    Your post has been deleted successfully.

    {#snippet action()}
        <Button variant="text" size="small">Undo</Button>
    {/snippet}
</Toast>`,
		expanded: `${script("import { Button, Toast } from '@sveltique/components';")}

<Toast type="warning" onClose={() => {}} class="max-w-96">
    Your session will expire soon.
</Toast>
<Toast type="info" class="max-w-96">
    Your post has been deleted successfully.

    {#snippet action()}
        <Button variant="text" size="small">Undo</Button>
    {/snippet}
</Toast>`
	}}
>
	<Toast type="warning" onClose={() => {}} class="max-w-96">Your session will expire soon.</Toast>
	<Toast type="info" class="max-w-96">
		Your post has been deleted successfully.

		{#snippet action()}
			<Button variant="text" size="small">Undo</Button>
		{/snippet}
	</Toast>
</Playground>
