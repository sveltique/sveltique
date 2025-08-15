<script>
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Badge } from '@sveltique/components';

	const code = {
		short: '<Badge>Groceries</Badge>',
		expanded: `${script('import { Badge } from "@sveltique/components";')}
        
<Badge>Groceries</Badge>`
	};
</script>

<h1>Badge</h1>
<p>A small badge with rounded corners.</p>

<h2>Basic Usage</h2>
<Playground {code}>
	<Badge>Groceries</Badge>
</Playground>
