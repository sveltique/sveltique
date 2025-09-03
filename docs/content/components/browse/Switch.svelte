<script module>
export const metadata = {
	description: "A binary on/off state in a more visual, accessible way than a standard checkbox."
};
</script>

<script>
import { Badge, Switch } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const code = {
	short: `<Switch />
<Switch checked />
<Switch disabled />
<Switch checked disabled />`,
	expanded: `${script("import { Switch } from '@sveltique/components';")}

<Switch />
<Switch checked />
<Switch disabled />
<Switch checked disabled />`
};
</script>

<h1 id="switch">Switch</h1>
<p>A binary on/off state in a more visual, accessible way than a standard checkbox.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code}>
	<Switch />
	<Switch checked />
	<Switch disabled />
	<Switch checked disabled />
</Playground>

<h3 id="toggle-event">Toggle event</h3>
<p>
    If you want to execute code when the switch's value changes, you can use the <Badge>ontoggle</Badge>
    callback.
</p>
