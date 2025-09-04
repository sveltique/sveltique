<script module>
export const metadata = {
	description: "A styled and accessible replacement for the native anchor element."
};
</script>

<script lang="ts">
import { Badge, Link } from "@sveltique/components";
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconExternalLink from "@tabler/icons-svelte/icons/external-link";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script('import { Link } from "@sveltique/components";')}
    
<Link href="#basic-usage">
    Go to the "Basic Usage" section
</Link>`;

const externalCode = `${script('import { Link } from "@sveltique/components";')}

<Link
    href="https://developer.mozilla.org"
    aria-label="To read more, see the MDN docs in a new tab."
    external
>
    See the MDN docs
</Link>`;

const iconCode = `${script(`import { Link } from "@sveltique/components";
    import IconExternalLink from "@tabler/icons-svelte/icons/external-link";`)}

<Link
    href="https://developer.mozilla.org"
    aria-label="To read more, see the MDN docs in a new tab."
    external
>
    See the MDN docs

    <!-- { "aria-hidden": true; class: string; } -->
    {#snippet icon({ props })}
        <IconExternalLink {...props} />
    {/snippet}
</Link>
<Link
    href="https://developer.mozilla.org"
    aria-label="To read more, see the MDN docs in a new tab."
    external
    icon={false}
>
    See the MDN docs
</Link>`;

const underlineCode = `${script('import { Link } from "@sveltique/components";')}

<Link href="#">underline="always"</Link>
<Link href="#" underline="hover">underline="hover"</Link>
<Link href="#" underline="none">underline="none"</Link>`;
</script>

<h1 id="link">Link</h1>
<p>A styled and accessible replacement for the native <code>a</code> element.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
	<Link href="#basic-usage">Go to the "Basic Usage" section</Link>
</Playground>

<h3 id="external-links">External links</h3>
<p>
	For external links, you can set the <Badge>external</Badge> attribute. It handles setting <Badge
		>target="_blank"</Badge
	>, <Badge>rel="noreferrer"</Badge>, and adds a small top right arrow icon (<IconArrowUpRight class="inline w-5 aspect-square" />).
</p>
<p>You can override the target and rel attributes individually if you need to.</p>
<Playground code={externalCode}>
	<Link
		href="https://developer.mozilla.org"
		aria-label="To read more, see the MDN docs in a new tab."
		external
	>
		See the MDN docs
	</Link>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="icon">Icon</h3>
<p>By default, external links include an up right arrow icon. You can use the <Badge>icon</Badge> snippet to customize or remove it.</p>
<Playground code={iconCode}>
    <Link
		href="https://developer.mozilla.org"
		aria-label="To read more, see the MDN docs in a new tab."
		external
	>
		See the MDN docs

        {#snippet icon({ props })}
            <IconExternalLink {...props} />
        {/snippet}
	</Link>
    <Link
		href="https://developer.mozilla.org"
		aria-label="To read more, see the MDN docs in a new tab."
		external
        icon={false}
	>
		See the MDN docs
	</Link>
</Playground>

<h2>Accessbility</h2>
<p>Some notes on accessibility.</p>

<h3 id="underline">Underline</h3>
<p>
	By default, links are underlined to conform with <Link
		href="https://webaim.org/blog/wcag-2-0-and-link-colors/"
		external>accessibility guidelines</Link
	>. However, you can change this behavior using the <Badge>underline</Badge> attribute.
</p>
<Playground code={underlineCode}>
	<Link href="#">underline="always"</Link>
	<Link href="#" underline="hover">underline="hover"</Link>
	<Link href="#" underline="none">underline="none"</Link>
</Playground>
