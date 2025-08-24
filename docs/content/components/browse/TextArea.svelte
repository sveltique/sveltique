<script>
import { TextArea } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const code = {
	short: '<TextArea placeholder="Enter your message here..." />',
	expanded: `${script("import { TextArea } from '@sveltique/components';")}
        
<TextArea placeholder="Enter your message here..." />`
};
</script>

<h1 id="text-area">Text Area</h1>
<p>A styled text area.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>You can use it as a drop-in replacement for text areas.</p>
<Playground {code}>
	<TextArea placeholder="Enter your message here..." />
</Playground>
