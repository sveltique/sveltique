<script module>
export const metadata = {
	description:
		"An enhanced input for working with numbers. It includes increment/decrement controls and enforces min and max constraints out of the box."
};
</script>

<script lang="ts">
import { Alert, Badge, NumberInput } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const code = `${script('import { NumberInput } from "@sveltique/components";')}

<NumberInput
    step={5}
    value={50} 
    min={0}
    max={100}
    containerClass="w-3xs"
/>`;
</script>

<h1 id="number-input">Number Input</h1>
<p>
	An enhanced input for working with numbers. It includes increment/decrement controls and enforces
    <Badge variant="secondary">min</Badge> and <Badge variant="secondary">max</Badge> constraints out
    of the box.
</p>
<Alert type="warning">
    Even if constraints are enforced on the client, you should always validate the value on the server.
</Alert>

<h2 id="basic-usage">Basic Usage</h2>
<p>Key behaviors:</p>
<ul>
    <li>
        Values are clamped to the allowed range whenever the <Badge variant="secondary">onchange</Badge>
        event fires.
    </li>
    <li>
        The <Badge variant="secondary">value</Badge> is always a number. However, if the field is empty
        or contains non-numeric values, it becomes <Badge variant="secondary">null</Badge> and the input
        is blank.
    </li>
</ul>
<Alert type="info" class="mb-4">
	Use the <Badge variant="secondary">containerClass</Badge> attribute to control the input's width.
</Alert>
<Playground {code} class="flex-col">
	<NumberInput step={5} value={50} min={0} max={100} containerClass="w-3xs" />
    <p class="text-sm italic text-muted-foreground text-center text-balance">
        Tip : try setting values outside the constraints (0 - 100)
    </p>
</Playground>
