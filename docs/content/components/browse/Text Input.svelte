<script module>
export const metadata = {
	description: "A styled replacement for the native text input, used for short, single-line text."
};
</script>

<script>
import { TextInput } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const code = `${script('import { TextInput } from "@sveltique/components";')}
    
<TextInput class="max-w-96" />`;
</script>

<h1 id="text-input">Text Input</h1>
<p>A styled replacement for the native text input, used for short, single-line text.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code}>
	<TextInput class="max-w-96" />
</Playground>
