<script module>
export const metadata = {
	description: "Checkboxes allow the user to select one or more items from a set."
};
</script>

<script>
import { Alert, Checkbox, Link } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const code = {
	short: `<Checkbox />
<Checkbox checked />
<Checkbox disabled />
<Checkbox checked disabled />`,
	expanded: `${script("import { Checkbox } from '@sveltique/components';")}

<Checkbox />
<Checkbox checked />
<Checkbox disabled />
<Checkbox checked disabled />`
};
</script>

<h1 id="checkbox">Checkbox</h1>
<p>Checkboxes allow the user to select one or more items from a set.</p>
<Alert>
    Consider using a <Link href="/docs/components/browse/switch">{'<Switch />'}</Link> if you only
    have one checkbox.
</Alert>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code}>
	<Checkbox />
	<Checkbox checked />
	<Checkbox disabled />
	<Checkbox checked disabled />
</Playground>
