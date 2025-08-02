<script>
	import { Button } from './index.js';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
</script>

<h1>Button</h1>
<p>Buttons allow users to take actions, and make choices, with a single tap.</p>
<h2>Basic Usage</h2>
<p>A button has three variants : contained (default), outline, and text.</p>
<div class="ui-container">
	<Button>CONTAINED</Button>
	<Button variant="outline">OUTLINE</Button>
	<Button variant="text">TEXT</Button>
</div>
<h2>Shapes</h2>
<p>A button can have three different shapes : rectangle (default), square, and circle.</p>
<div class="ui-container">
	<Button>
		Add an item <IconPlus />
	</Button>
	<Button shape="square">
		<IconPlus />
	</Button>
	<Button shape="circle">
		<IconPlus />
	</Button>
</div>
