<script>
	import Button from './Button.svelte';
	import Playground from '$docs/Playground.svelte';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import Badge from '$lib/components/data-display/badge/Badge.svelte';
</script>

<h1>Button</h1>
<p>Buttons allow users to take actions, and make choices, with a single tap.</p>

<h2>Basic Usage</h2>
<p>A button has three variants: contained (default), outline, and text.</p>
<Playground>
	<Button>CONTAINED</Button>
	<Button variant="outline">OUTLINE</Button>
	<Button variant="text">TEXT</Button>
</Playground>

<h2>Shapes</h2>
<p>A button can have three different shapes: rectangle (default), square, and circle.</p>
<Playground>
	<Button>
		Add an item <IconPlus />
	</Button>
	<Button shape="square">
		<IconPlus />
	</Button>
	<Button shape="circle">
		<IconPlus />
	</Button>
</Playground>

<h2>Colors</h2>
<p>The <Badge>color</Badge> prop changes the button's color theme :</p>
<ul class="list-disc pl-5">
	<li><strong>primary</strong> : the default color scheme for main actions</li>
	<li>
		<strong>danger</strong> : indicates destructive or irreversible actions, styled with red tones
	</li>
</ul>
<Playground class="flex-col">
	<div class="relative flex w-full items-center justify-center gap-5">
		<Button color="primary">Primary</Button>
		<Button color="primary" variant="outline">Primary Outline</Button>
		<Button color="primary" variant="text">Primary Text</Button>
	</div>

	<div class="relative flex w-full items-center justify-center gap-5">
		<Button color="danger">Danger</Button>
		<Button color="danger" variant="outline">Danger Outline</Button>
		<Button color="danger" variant="text">Danger Text</Button>
	</div>
</Playground>

<h2>Disabled</h2>
<p>
	When a button is disabled via the <Badge>disabled</Badge> prop, it reduces its opacity and disables
	pointer events to indicate it is inactive and not clickable.
</p>
<Playground>
	<Button disabled>Disabled Contained</Button>
	<Button disabled variant="outline">Disabled Outline</Button>
	<Button disabled variant="text">Disabled Text</Button>
</Playground>
