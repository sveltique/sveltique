<script module>
export const metadata = {
	description: "Checkboxes allow the user to select one or more items from a set."
};
</script>

<script>
import { Alert, Checkbox, Label, Link } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script("import { Checkbox } from '@sveltique/components';")}

<Checkbox />
<Checkbox checked />
<Checkbox disabled />
<Checkbox checked disabled />`

const withLabelCode = `${script("import { Checkbox, Label } from '@sveltique/components';")}

<div class="relative flex items-center justify-center gap-3">
    <Checkbox id="tos" />
    <Label for="tos">
        I have read the Terms of Services.
    </Label>
</div>`;
</script>

<h1 id="checkbox">Checkbox</h1>
<p>Checkboxes allow the user to select one or more items from a set.</p>
<Alert>
    Consider using a <Link href="/docs/components/browse/switch">{'<Switch />'}</Link> if you only
    have one checkbox.
</Alert>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
	<Checkbox />
	<Checkbox checked />
	<Checkbox disabled />
	<Checkbox checked disabled />
</Playground>

<h2 id="examples">Examples</h2>

<h3>With Label</h3>
<Playground code={withLabelCode}>
    <div class="relative flex items-center justify-center gap-3">
        <Checkbox id="tos" />
        <Label for="tos">
            I have read the Terms of Services.
        </Label>
    </div>
</Playground>
