<script lang="ts">
	import { Badge, Link } from '@sveltique/components';
	import Playground from '$components/Playground.svelte';
	import { basicUsageCode, externalCode, underlineCode } from './content.js';
</script>

<h1>Link</h1>
<p>A styled and accessible link.</p>

<h2>Basic Usage</h2>
<p>You can use the {'<Link />'} component as a drop-in replacement for anchor elements.</p>
<Playground code={basicUsageCode}>
	<Link href="#basic-usage">Go to the "Basic Usage" section</Link>
</Playground>

<h3>Underline</h3>
<p>
	By default, links are underlined to conform with <Link
		href="https://webaim.org/blog/wcag-2-0-and-link-colors/"
		external>accessbility guidelines</Link
	>. However, you can change this behavior using the <Badge>underline</Badge> attribute.
</p>
<Playground code={underlineCode}>
	<Link href="#">underline="always"</Link>
	<Link href="#" underline="hover">underline="hover"</Link>
	<Link href="#" underline="none">underline="none"</Link>
</Playground>

<h2>External links</h2>
<p>
	For external links, you can set the <Badge>external</Badge> attribute. It handles setting <Badge
		>target="_blank"</Badge
	>, <Badge>rel="noreferrer"</Badge>, and adds a small top right arrow icon (↗).
</p>
<p>You can override them individually if you need to.</p>
<Playground code={externalCode}>
	<Link
		href="https://developer.mozilla.org"
		external
		title="To read more, see the MDN docs in a new tab."
	>
		See the MDN docs
	</Link>
</Playground>
