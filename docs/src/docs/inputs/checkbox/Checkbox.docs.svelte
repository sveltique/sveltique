<script>
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Checkbox } from '@novaotp/components';

	const code = {
		short: `<Checkbox />
<Checkbox checked />
<Checkbox disabled />
<Checkbox checked disabled />`,
		expanded: `${script("import { Checkbox } from '@novaotp/components';")}

<Checkbox />
<Checkbox checked />
<Checkbox disabled />
<Checkbox checked disabled />`
	};
</script>

<h1>Checkbox</h1>
<p>Checkboxes allow the user to select one or more items from a set.</p>

<h2>Basic Usage</h2>
<Playground {code}>
	<Checkbox />
	<Checkbox checked />
	<Checkbox disabled />
	<Checkbox checked disabled />
</Playground>
