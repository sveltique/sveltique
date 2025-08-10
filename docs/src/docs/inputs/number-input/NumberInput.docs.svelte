<script lang="ts">
	import Playground from '$components/Playground.svelte';
	import { Badge, NumberInput } from '@novaotp/components';

	const code = {
		short: `<NumberInput
    step={5}
    value={50}
    min={0}
    max={100}
    containerClass="w-3xs"
/>`,
		expanded: `&lt;script lang="ts"&gt;
    import { NumberInput } from '@novaotp/design/components';
&lt;/script&gt;

<!--
step : increment/decrement buttons use this
value : a bindable starting value
min : enforces a min value with JS
max : enforces a max value with JS
containerClass : caps the input width
-->

<NumberInput
    step={5}
    value={50} 
    min={0}
    max={100}
    containerClass="w-3xs"
/>`
	};
</script>

<h1>Number Input</h1>
<p>
	An JS-enhanced input for numbers, with increment/decrement buttons and built-in <Badge>min</Badge>
	and <Badge>max</Badge> enforcement.
</p>
<h2>Basic Usage</h2>
<Playground {code}>
	<NumberInput step={5} value={50} min={0} max={100} containerClass="w-3xs" />
</Playground>
