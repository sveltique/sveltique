<script>
import { Checkbox } from "@sveltique/components";
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

<h1>Checkbox</h1>
<p>Checkboxes allow the user to select one or more items from a set.</p>

<h2>Basic Usage</h2>
<Playground {code}>
	<Checkbox />
	<Checkbox checked />
	<Checkbox disabled />
	<Checkbox checked disabled />
</Playground>
