<script module>
export const metadata = {
	description: "A syled replacement for the native textarea element."
};
</script>

<script>
import { Alert, Link, TextArea } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const code = {
	short: '<TextArea placeholder="Enter your message here..." />',
	expanded: `${script("import { TextArea } from '@sveltique/components';")}
        
<TextArea
    placeholder="Enter your message here..."
    class="max-w-96"
/>`
};
</script>

<h1 id="text-area">Text Area</h1>
<p>A syled replacement for the native <code>textarea</code> element.</p>
<Alert>
    Consider using a <Link>TextInput</Link> if you only need one line.
</Alert>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code}>
	<TextArea placeholder="Enter your message here..." class="max-w-96" />
</Playground>
