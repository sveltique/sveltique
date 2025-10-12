<script module>
export const metadata = {
	description: "Renders content outside of its natural DOM hierarchy."
};
</script>

<script lang="ts">
import { Portal } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

let target = $state<HTMLDivElement>();

let basicUsageCode = `${script(`import { Portal } from "@sveltique/components";

    let target = $state<HTMLDivElement>();`)}

<div class="p-4 rounded-lg border-2 border-dashed border-muted">
    <p>You might think I would render here</p>
    <Portal {target}>
        <p>But I'm actually here</p>
    </Portal>
</div>
<div bind:this={target}></div>`;
</script>

<h1>Portal</h1>
<p>Renders content outside of its natural DOM hierarchy.</p>

<h2>Basic Usage</h2>
<p>You can portal elements using DOM nodes or query selectors.</p>
<Playground code={basicUsageCode} class="flex-col">
    <div class="p-4 rounded-lg border-2 border-dashed border-muted">
        <p>You might think I would render here</p>
        <Portal {target}>
            <p>But I'm actually here</p>
        </Portal>
    </div>
    <div bind:this={target}></div>
</Playground>
