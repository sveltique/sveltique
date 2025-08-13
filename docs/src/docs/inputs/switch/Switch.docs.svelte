<script>
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Banner, Switch } from '@novaotp/components';

	const code = {
		short: `<Switch />
<Switch checked />
<Switch disabled />
<Switch checked disabled />`,
		expanded: `${script("import { Switch } from '@novaotp/components';")}

<Switch />
<Switch checked />
<Switch disabled />
<Switch checked disabled />`
	};
</script>

<h1>Switch</h1>
<p>A switch-style element for displaying on/off states.</p>

<h2>Basic Usage</h2>
<Banner type="info" class="mb-4">Under the hood, it behaves like a checkbox.</Banner>
<Playground {code}>
	<Switch />
	<Switch checked />
	<Switch disabled />
	<Switch checked disabled />
</Playground>
