<script module>
export const metadata = {
	description:
		"An JS-enhanced input for numbers, with increment/decrement buttons and built-in min/max enforcement."
};
</script>


<script lang="ts">
import { Badge, NumberInput } from "@sveltique/components";
import Playground from "$components/Playground.svelte";

const code = {
	short: `<NumberInput
    step={5}
    value={50}
    min={0}
    max={100}
    containerClass="w-3xs"
/>`,
	expanded: `&lt;script lang="ts"&gt;
    import { NumberInput } from '@sveltique/components';
&lt;/script&gt;

<NumberInput
    step={5}
    value={50} 
    min={0}
    max={100}
    containerClass="w-3xs"
/>`
};
</script>

<h1 id="number-input">Number Input</h1>
<p>
	An JS-enhanced input for numbers, with increment/decrement buttons and built-in <Badge variant="secondary">min</Badge>
	and <Badge variant="secondary">max</Badge> enforcement.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code}>
	<NumberInput step={5} value={50} min={0} max={100} containerClass="w-3xs" />
</Playground>
