<script module>
export const metadata = {
	description: "Labels or describes an associated form control."
};
</script>

<script>
import { Alert, Checkbox, Label, Link } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script('import { Checkbox, Label } from "@sveltique/components";')}

<div class="relative flex items-center justify-center gap-3">
    <Checkbox id="tos" />
    <Label for="tos">
        I have read the Terms of Services.
    </Label>
</div>`;
</script>

<h1 id="label">Label</h1>
<p>Labels or describes an associated form control.</p>
<Alert>
    To build a full form field with a label, an error message, and configurable placement, checkout
    the <Link href="/docs/components/browse/field">Field</Link> component.
</Alert>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
    <div class="relative flex items-center justify-center gap-3">
        <Checkbox id="tos" />
        <Label for="tos">I have read the Terms of Services.</Label>
    </div>
</Playground>
