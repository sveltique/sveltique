<script>
	import Playground from '$docs/Playground.svelte';
	import Banner from './Banner.svelte';
</script>

<h1>Banner</h1>
<p>
	A visual message box used to communicate contextual feedback to users, such as information,
	success, warnings, or errors.
</p>
<h2>Basic Usage</h2>
<p>
	A banner renders a different color and icon based on its type : info (default), success, warning,
	and danger.
</p>
<Playground class="flex-col">
	<Banner type="info">This is an informational message. You can safely ignore it.</Banner>
	<Banner type="success">Your profile was updated successfully.</Banner>
	<Banner type="warning">Your subscription will expire in 3 days.</Banner>
	<Banner type="danger">Failed to save changes. Please try again later.</Banner>
</Playground>
