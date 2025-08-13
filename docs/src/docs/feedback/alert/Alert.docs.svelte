<script>
	import Playground from '$components/Playground.svelte';
	import { Alert } from '@novaotp/components';
</script>

<h1>Alert</h1>
<p>
	A visual message box used to communicate contextual feedback to users, such as information,
	success, warnings, or errors.
</p>
<h2>Basic Usage</h2>
<p>
	An alert renders a different color and icon based on its type : info (default), success, warning,
	and danger.
</p>
<Playground class="flex-col">
	<Alert type="info">This is an informational message. You can safely ignore it.</Alert>
	<Alert type="success">Your profile was updated successfully.</Alert>
	<Alert type="warning">Your subscription will expire in 3 days.</Alert>
	<Alert type="danger">Failed to save changes. Please try again later.</Alert>
</Playground>
