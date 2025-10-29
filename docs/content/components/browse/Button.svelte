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

const basicUsageCode = `${script('import { Button } from "@sveltique/components";')}

<Button>CONTAINED</Button>
<Button variant="outline">OUTLINE</Button>
<Button variant="text">TEXT</Button>
<Button variant="danger">Danger</Button>`;

const disabledCode = `${script('import { Button } from "@sveltique/components";')}

<Button disabled>Disabled Contained</Button>
<Button disabled variant="outline">Disabled Outline</Button>
<Button disabled variant="text">Disabled Text</Button>
<Button disabled variant="danger">Disabled Danger</Button>`;

const fullWidthCode = `${script('import { Button } from "@sveltique/components";')}

<Button fullWidth>
    I'm taking the full width of my container
</Button>`;

const shapeCode = `${script('import { Button } from "@sveltique/components";')}

<Button>Add an item</Button>
<Button shape="square">
    <IconPlus />
</Button>`;

const sizeCode = `${script('import { Button } from "@sveltique/components";')}

<div class="relative flex justify-center items-center gap-5 w-full">
    <Button size="small">Add an item</Button>
    <Button>Add an item</Button>
</div>

<div class="relative flex justify-center items-center gap-5 w-full">
    <Button size="small" shape="square">
        <IconPlus />
    </Button>
    <Button shape="square">
        <IconPlus />
    </Button>
</div>`;

const colorCode = `${script('import { Button } from "@sveltique/components";')}

<div class="relative flex justify-center items-center gap-5 w-full">
    <Button color="primary">Primary</Button>
    <Button color="primary" variant="outline">Primary Outline</Button>
    <Button color="primary" variant="text">Primary Text</Button>
</div>

<div class="relative flex justify-center items-center gap-5 w-full">
    <Button color="danger">Danger</Button>
    <Button color="danger" variant="outline">Danger Outline</Button>
    <Button color="danger" variant="text">Danger Text</Button>
</div>`;
</script>

<h1 id="button">Button</h1>
<p>Buttons allow users to take actions, and make choices, with a single tap.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>A button has four variants: contained (default), outline, text, and danger.</p>
<Playground code={basicUsageCode} class="md:flex-row flex-col">
	<Button>Contained</Button>
	<Button variant="outline">Outline</Button>
	<Button variant="text">Text</Button>
	<Button variant="danger">Danger</Button>
</Playground>

<h3 id="disabled">Disabled</h3>
<p>You can disable a button with the <Badge variant="secondary">disabled</Badge> property.</p>
<p>
	It reduces its opacity and disables pointer events to indicate it is inactive and not clickable.
</p>
<Playground code={disabledCode} class="max-md:flex-col">
	<Button disabled>Disabled Contained</Button>
	<Button disabled variant="outline">Disabled Outline</Button>
	<Button disabled variant="text">Disabled Text</Button>
	<Button disabled variant="danger">Disabled Danger</Button>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="full-width">Full Width</h3>
<p>
    Use the <Badge variant="secondary">fullWidth</Badge> property to make the button take the full width
    available.
</p>
<Playground code={fullWidthCode} class="md:flex-row flex-col">
	<Button fullWidth>I'm taking the full width of my container</Button>
</Playground>

<h3 id="shape">Shape</h3>
<p>A button can have two different shapes: rectangle (default), and square.</p>
<Playground code={shapeCode}>
	<Button>Add an item</Button>
	<Button shape="square">
		<IconPlus />
	</Button>
</Playground>

<h3 id="size">Size</h3>
<p>A button can have two different sizes : medium (default), or small.</p>
<Playground code={sizeCode} class="flex-col">
	<div class="relative flex justify-center items-center gap-5 w-full">
		<Button size="small">Add an item</Button>
		<Button>Add an item</Button>
	</div>

	<div class="relative flex justify-center items-center gap-5 w-full">
		<Button size="small" shape="square">
			<IconPlus />
		</Button>
		<Button shape="square">
			<IconPlus />
		</Button>
	</div>
</Playground>
