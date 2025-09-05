<script module>
export const metadata = {
	description: "A binary on/off state in a more visual, accessible way than a standard checkbox."
};
</script>

<script lang="ts">
import { Badge, Switch } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { toasts } from "$lib/contexts/toast.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script("import { Switch } from '@sveltique/components';")}

<Switch />
<Switch checked />
<Switch disabled />
<Switch checked disabled />`;

const toggleEventCode = `${script(`import { Switch } from "@sveltique/components";
    import { toasts } from "path/to/toasts";

    function ontoggle(checked: boolean) {
        const type = checked ? "success" : "danger";
        const content = checked ? "Switch is toggled." : "Switch is not toggled.";

        toasts.add({ type, content });
    }`)}

<Switch {ontoggle} />`;

function ontoggle(checked: boolean) {
    const type = checked ? "success" : "danger";
    const content = checked ? "Switch is toggled." : "Switch is not toggled.";

    toasts.add({ type, content });
}
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

<h3 id="toggle-event">Toggle event</h3>
<p>
    If you want to execute code when the switch's value changes, you can use the <Badge variant="secondary">ontoggle</Badge>
    callback.
</p>
<Playground code={toggleEventCode}>
    <Switch {ontoggle} />
</Playground>
