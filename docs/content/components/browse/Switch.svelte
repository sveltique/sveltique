<script module>
export const metadata = {
	description: "A binary on/off state in a more visual, accessible way than a standard checkbox."
};
</script>

<script lang="ts">
import { Badge, Button, Switch } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

let checked = $state(false);

function toggle() {
    checked = !checked;
}

const basicUsageCode = `${script("import { Switch } from '@sveltique/components';")}

<Switch />
<Switch checked />
<Switch disabled />
<Switch checked disabled />`;

const controllingStateCode = `${script(`import { Switch } from '@sveltique/components';

    let checked = $state(false);

    function toggle() {
        checked = !checked;
    }`)}

<Switch bind:checked />
<Button onclick={toggle}>
    Toggle switch
</Button>`
</script>

<h1 id="switch">Switch</h1>
<p>A binary on/off state in a more visual, accessible way than a standard checkbox.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
	<Switch />
	<Switch checked />
	<Switch disabled />
	<Switch checked disabled />
</Playground>

<h2 id="controlling-state">Controlling state</h2>
<p>
    You can bind to the <Badge variant="secondary">checked</Badge> property to manually control the
    state of the switch.
</p>
<Playground code={controllingStateCode} class="flex-col">
    <Switch bind:checked />
    <Button onclick={toggle}>Toggle switch</Button>
</Playground>
