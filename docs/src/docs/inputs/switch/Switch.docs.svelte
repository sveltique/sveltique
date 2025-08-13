<script>
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Alert, Switch } from '@sveltique/components';

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

<h1>Switch</h1>
<p>A switch-style element for displaying on/off states.</p>

<h2>Basic Usage</h2>
<Alert type="info" class="mb-4">Under the hood, it behaves like a checkbox.</Alert>
<Playground {code}>
	<Switch />
	<Switch checked />
	<Switch disabled />
	<Switch checked disabled />
</Playground>
