<script module>
export const metadata = {
	description: "Brief notifications of processes that have been or will be performed."
};
</script>

<script lang="ts">
import { Alert, Badge, Button, Link, Toast } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { toasts } from "$lib/contexts/toast.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script("import { Toast } from '@sveltique/components';")}
    
<Toast type="info" class="max-w-96">
    This feature is not implemented yet.
</Toast>
<Toast type="success" class="max-w-96">
    Post added successfully.
</Toast>
<Toast type="warning" class="max-w-96">
    You will be disconnected in 5 minutes.
</Toast>
<Toast type="danger" class="max-w-96">
    An unknown error occurred.
</Toast>`;

const actionCode = `${script("import { Button, Toast } from '@sveltique/components';")}

<Toast type="warning" onClose={() => {}} class="max-w-96">
    Your session will expire soon.
</Toast>
<Toast type="success" class="max-w-96">
    Your post has been deleted successfully.

    {#snippet action()}
        <Button variant="text" size="small">Undo</Button>
    {/snippet}
</Toast>`
</script>

<h1 id="toast">Toast</h1>
<p>Brief notifications of processes that have been or will be performed.</p>
<Alert class="mb-4">
    Interested in calling toasts programmatically ? Check out the <Link href="/docs/patterns/browse/programmatic-toasts">
        Programmatic Toasts
    </Link> pattern !
</Alert>

<h2 id="basic-usage">Basic Usage</h2>
<p>A toast has 4 types : info (default), success, warning, and danger.</p>
<Playground code={basicUsageCode} class="flex-col">
	<Toast type="info" class="max-w-96">This feature is not implemented yet.</Toast>
	<Toast type="success" class="max-w-96">Post added successfully.</Toast>
	<Toast type="warning" class="max-w-96">You will be disconnected in 5 minutes.</Toast>
	<Toast type="danger" class="max-w-96">An unknown error occurred.</Toast>
</Playground>

<h3 id="action">Action</h3>
<p>
	To add a close button, you can simply pass an <Badge variant="secondary">onClose</Badge> function. Otherwise, you can use
	the <Badge variant="secondary">action</Badge> snippet to add a custom action.
</p>
<Playground code={actionCode} class="flex-col">
	<Toast type="warning" onClose={() => {}} class="max-w-96">Your session will expire soon.</Toast>
	<Toast type="success" class="max-w-96">
		Your post has been deleted successfully.

		{#snippet action()}
			<Button variant="text" size="small">Undo</Button>
		{/snippet}
	</Toast>
</Playground>
