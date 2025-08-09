<script lang="ts">
	import Playground from '$docs/Playground.svelte';
	import Badge from '$lib/components/data-display/badge/Badge.svelte';
	import { basicUsageCode } from './content.js';
	import Link from './Link.svelte';
</script>

<h1>Link</h1>
<p>A styled and accessible link.</p>

<h2>Basic Usage</h2>
<p>You can use the {'<Link />'} component as a drop-in replacement for anchor elements.</p>
<Playground code={basicUsageCode}>
	<Link href="#basic-usage">Go to the "Basic Usage" section</Link>
</Playground>

<h2>External links</h2>
<p>
	For external links, you can set the <Badge>external</Badge> attribute. It handles setting <Badge
		>target="_blank"</Badge
	> and <Badge>rel="noreferrer"</Badge>. You can override them individually if you need to.
</p>
<Playground>
	<Link
		href="https://developer.mozilla.org"
		external
		aria-label="To read more, see the MDN docs in a new tab."
	>
		See the MDN docs
	</Link>
</Playground>
