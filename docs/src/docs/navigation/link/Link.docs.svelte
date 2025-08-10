<script lang="ts">
	import Playground from '$components/Playground.svelte';
	import { Badge, Link } from '@novaotp/components';
	import { basicUsageCode } from './content.js';
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
