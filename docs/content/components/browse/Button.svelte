<script>
	import Playground from '$components/Playground.svelte';
	import { Badge, Button } from '@sveltique/components';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import { script } from '$utils/playground';

	const basicCode = {
		short: `<Button>CONTAINED</Button>
<Button variant="outline">OUTLINE</Button>
<Button variant="text">TEXT</Button>`,
		expanded: `${script('import { Button } from "@sveltique/components";')}

<Button>CONTAINED</Button>
<Button variant="outline">OUTLINE</Button>
<Button variant="text">TEXT</Button>`
	};

	const shapeCode = {
		short: `<Button>
    Add an item
</Button>
<Button shape="square">
    <IconPlus />
</Button>
<Button shape="circle">
    <IconPlus />
</Button>`,
		expanded: `${script('import { Button } from "@sveltique/components";')}

<Button>
    Add an item
</Button>
<Button shape="square">
    <IconPlus />
</Button>
<Button shape="circle">
    <IconPlus />
</Button>`
	};

	const sizeCode = {
		short: `<div class="relative flex w-full items-center justify-center gap-5">
    <Button size="small">Add an item</Button>
    <Button>Add an item</Button>
    <Button size="large">Add an item</Button>
</div>

<div class="relative flex w-full items-center justify-center gap-5">
    <Button size="small" shape="square">
        <IconPlus />
    </Button>
    <Button shape="square">
        <IconPlus />
    </Button>
    <Button size="large" shape="square">
        <IconPlus />
    </Button>
</div>

<div class="relative flex w-full items-center justify-center gap-5">
    <Button size="small" shape="circle">
        <IconPlus />
    </Button>
    <Button shape="circle">
        <IconPlus />
    </Button>
    <Button size="large" shape="circle">
        <IconPlus />
    </Button>
</div>`,
		expanded: `${script('import { Button } from "@sveltique/components";')}

<div class="relative flex w-full items-center justify-center gap-5">
    <Button size="small">Add an item</Button>
    <Button>Add an item</Button>
    <Button size="large">Add an item</Button>
</div>

<div class="relative flex w-full items-center justify-center gap-5">
    <Button size="small" shape="square">
        <IconPlus />
    </Button>
    <Button shape="square">
        <IconPlus />
    </Button>
    <Button size="large" shape="square">
        <IconPlus />
    </Button>
</div>

<div class="relative flex w-full items-center justify-center gap-5">
    <Button size="small" shape="circle">
        <IconPlus />
    </Button>
    <Button shape="circle">
        <IconPlus />
    </Button>
    <Button size="large" shape="circle">
        <IconPlus />
    </Button>
</div>`
	};

	const colorCode = {
		short: `<div class="relative flex w-full items-center justify-center gap-5">
    <Button color="primary">Primary</Button>
    <Button color="primary" variant="outline">Primary Outline</Button>
    <Button color="primary" variant="text">Primary Text</Button>
</div>

<div class="relative flex w-full items-center justify-center gap-5">
    <Button color="danger">Danger</Button>
    <Button color="danger" variant="outline">Danger Outline</Button>
    <Button color="danger" variant="text">Danger Text</Button>
</div>`,
		expanded: `${script('import { Button } from "@sveltique/components";')}

<div class="relative flex w-full items-center justify-center gap-5">
    <Button color="primary">Primary</Button>
    <Button color="primary" variant="outline">Primary Outline</Button>
    <Button color="primary" variant="text">Primary Text</Button>
</div>

<div class="relative flex w-full items-center justify-center gap-5">
    <Button color="danger">Danger</Button>
    <Button color="danger" variant="outline">Danger Outline</Button>
    <Button color="danger" variant="text">Danger Text</Button>
</div>`
	};

	const disabledCode = {
		short: `<Button disabled>Disabled Contained</Button>
<Button disabled variant="outline">Disabled Outline</Button>
<Button disabled variant="text">Disabled Text</Button>`,
		expanded: `${script('import { Button } from "@sveltique/components";')}

<Button disabled>Disabled Contained</Button>
<Button disabled variant="outline">Disabled Outline</Button>
<Button disabled variant="text">Disabled Text</Button>`
	};
</script>

<h1>Button</h1>
<p>Buttons allow users to take actions, and make choices, with a single tap.</p>

<h2>Basic Usage</h2>
<p>A button has three variants: contained (default), outline, and text.</p>
<Playground code={basicCode} class="flex-col md:flex-row">
	<Button>CONTAINED</Button>
	<Button variant="outline">OUTLINE</Button>
	<Button variant="text">TEXT</Button>
</Playground>

<h2>Customization</h2>

<h3>Shape</h3>
<p>A button can have three different shapes: rectangle (default), square, and circle.</p>
<Playground code={shapeCode}>
	<Button>Add an item</Button>
	<Button shape="square">
		<IconPlus />
	</Button>
	<Button shape="circle">
		<IconPlus />
	</Button>
</Playground>

<h3>Size</h3>
<p>A button can have three different sizes : medium (default), small, and large.</p>
<Playground code={sizeCode} class="flex-col">
	<div class="relative flex w-full items-center justify-center gap-5">
		<Button size="small">Add an item</Button>
		<Button>Add an item</Button>
		<Button size="large">Add an item</Button>
	</div>

	<div class="relative flex w-full items-center justify-center gap-5">
		<Button size="small" shape="square">
			<IconPlus />
		</Button>
		<Button shape="square">
			<IconPlus />
		</Button>
		<Button size="large" shape="square">
			<IconPlus />
		</Button>
	</div>

	<div class="relative flex w-full items-center justify-center gap-5">
		<Button size="small" shape="circle">
			<IconPlus />
		</Button>
		<Button shape="circle">
			<IconPlus />
		</Button>
		<Button size="large" shape="circle">
			<IconPlus />
		</Button>
	</div>
</Playground>

<h3>Color</h3>
<p>The <Badge>color</Badge> prop changes the button's color theme :</p>
<ul class="list-disc pl-5">
	<li><strong>primary</strong> : the default color scheme for main actions</li>
	<li>
		<strong>danger</strong> : indicates destructive or irreversible actions, styled with red tones
	</li>
</ul>
<Playground code={colorCode} class="flex-col">
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

<h3>Disabled</h3>
<p>
	When a button is disabled via the <Badge>disabled</Badge> prop, it reduces its opacity and disables
	pointer events to indicate it is inactive and not clickable.
</p>
<Playground code={disabledCode}>
	<Button disabled>Disabled Contained</Button>
	<Button disabled variant="outline">Disabled Outline</Button>
	<Button disabled variant="text">Disabled Text</Button>
</Playground>
