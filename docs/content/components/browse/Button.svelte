<script module>
export const metadata = {
	description: "Buttons allow users to take actions, and make choices, with a single tap."
};
</script>

<script>
import { Badge, Button } from "@sveltique/components";
import IconPlus from "@tabler/icons-svelte/icons/plus";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicCode = `${script('import { Button } from "@sveltique/components";')}

<Button>CONTAINED</Button>
<Button variant="outline">OUTLINE</Button>
<Button variant="text">TEXT</Button>`;

const shapeCode = `${script('import { Button } from "@sveltique/components";')}

<Button>
    Add an item
</Button>
<Button shape="square">
    <IconPlus />
</Button>`;

const sizeCode = `${script('import { Button } from "@sveltique/components";')}

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
</div>`;

const colorCode = `${script('import { Button } from "@sveltique/components";')}

<div class="relative flex w-full items-center justify-center gap-5">
    <Button color="primary">Primary</Button>
    <Button color="primary" variant="outline">Primary Outline</Button>
    <Button color="primary" variant="text">Primary Text</Button>
</div>

<div class="relative flex w-full items-center justify-center gap-5">
    <Button color="danger">Danger</Button>
    <Button color="danger" variant="outline">Danger Outline</Button>
    <Button color="danger" variant="text">Danger Text</Button>
</div>`;

const disabledCode = `${script('import { Button } from "@sveltique/components";')}

<Button disabled>Disabled Contained</Button>
<Button disabled variant="outline">Disabled Outline</Button>
<Button disabled variant="text">Disabled Text</Button>`;
</script>

<h1 id="button">Button</h1>
<p>Buttons allow users to take actions, and make choices, with a single tap.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>A button has three variants: contained (default), outline, and text.</p>
<Playground code={basicCode} class="flex-col md:flex-row">
	<Button>CONTAINED</Button>
	<Button variant="outline">OUTLINE</Button>
	<Button variant="text">TEXT</Button>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="shape">Shape</h3>
<p>A button can have two different shapes: rectangle (default), and square.</p>
<Playground code={shapeCode}>
	<Button>Add an item</Button>
	<Button shape="square">
		<IconPlus class="size-5" />
	</Button>
</Playground>

<h3 id="size">Size</h3>
<p>A button can have two different sizes : medium (default), or small.</p>
<Playground code={sizeCode} class="flex-col">
	<div class="relative flex w-full items-center justify-center gap-5">
		<Button size="small">Add an item</Button>
		<Button>Add an item</Button>
	</div>

	<div class="relative flex w-full items-center justify-center gap-5">
		<Button size="small" shape="square">
			<IconPlus />
		</Button>
		<Button shape="square">
			<IconPlus />
		</Button>
	</div>
</Playground>

<h3 id="color">Color</h3>
<p>
    The <Badge variant="secondary">color</Badge> attribute changes the button's color : primary (default),
    the default color scheme for main actions, and danger, for destructive or
    irreversible actions.
</p>
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

<h3 id="disabled">Disabled</h3>
<p>
	When a button is disabled via the <Badge variant="secondary">disabled</Badge> prop, it reduces its opacity and disables
	pointer events to indicate it is inactive and not clickable.
</p>
<Playground code={disabledCode} class="max-sm:flex-col">
	<Button disabled>Disabled Contained</Button>
	<Button disabled variant="outline">Disabled Outline</Button>
	<Button disabled variant="text">Disabled Text</Button>
</Playground>
