<script lang="ts">
import { Badge, Link } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = {
	short: `<Link href="#basic-usage">
    Go to the "Basic Usage" section
</Link>`,
	expanded: `${script('import { Link } from "@sveltique/components";')}
    
<Link href="#basic-usage">
    Go to the "Basic Usage" section
</Link>`
};

const underlineCode = {
	short: `<Link href="#">underline="always"</Link>
<Link href="#" underline="hover">underline="hover"</Link>
<Link href="#" underline="none">underline="none"</Link>`,
	expanded: `${script('import { Link } from "@sveltique/components";')}

<Link href="#">underline="always"</Link>
<Link href="#" underline="hover">underline="hover"</Link>
<Link href="#" underline="none">underline="none"</Link>`
};

const externalCode = {
	short: `<Link
    href="https://developer.mozilla.org"
    external
    title="To read more, see the MDN docs in a new tab."
>
    See the MDN docs
</Link>`,
	expanded: `${script('import { Link } from "@sveltique/components";')}

<Link
    href="https://developer.mozilla.org"
    external
    title="To read more, see the MDN docs in a new tab."
>
    See the MDN docs
</Link>`
};
</script>

<h1 id="link">Link</h1>
<p>A styled and accessible link.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>You can use the {'<Link />'} component as a drop-in replacement for anchor elements.</p>
<Playground code={basicUsageCode}>
	<Link href="#basic-usage">Go to the "Basic Usage" section</Link>
</Playground>

<h3 id="underline">Underline</h3>
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

<h2 id="external-links">External links</h2>
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
