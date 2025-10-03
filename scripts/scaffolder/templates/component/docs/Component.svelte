<script module>
export const metadata = {
	description: "Explain what the component does."
};
</script>

<script lang="ts">
import { Badge, $$component:pascal-case } from "@sveltique/components";
import Playground from "$lib/components/Playground.svelte";
import { script } from '$utils/playground';

const basicUsageCode = `${script('import { $$component:pascal-case } from "@sveltique/components";')}

<$$component:pascal-case />`;

const exampleOneCode = `${script('import { $$component:pascal-case } from "@sveltique/components";')}

<$$component:pascal-case />`;
</script>

<h1 id="component">$$component:pascal-case</h1>
<p>Explain what the component does.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>[Optional text for basic usage.]</p>
<Playground code={basicUsageCode}>
    <$$component:pascal-case />
</Playground>

<!-- [OPTIONAL] Only useful if there are relevant features to mention -->
<h2 id="features">Features</h2>
<ul>
    <li>
        Mention the features of $$component:pascal-case
    </li>
    <!-- ... -->
</ul>

<!-- [OPTIONAL] Only useful if it's a composed component -->
<h2 id="structure">Structure</h2>
<p>Explain the structure of $$component:pascal-case.</p>
<ul>
    <li>
        <Badge variant="secondary">$$component:pascal-case.Root</Badge> : The root container.
    </li>
    <!-- ... -->
</ul>

<!-- [OPTIONAL] Only useful if there are accessibility-specific info to mention, or caveats -->
<h2 id="accessibility">Accessibility</h2>
<p>Talk about accessibility.</p>

<!-- [OPTIONAL] Always useful to demonstrate the component in a relevant context. -->
<h2 id="examples">Examples</h2>

<h3 id="example-one">Example One</h3>
<Playground code={exampleOneCode}>
    <$$component:pascal-case />
</Playground>
