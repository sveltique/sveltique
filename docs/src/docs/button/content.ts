import { script } from '$utils/playground';

export const basicCode = {
	short: `<Button>CONTAINED</Button>
<Button variant="outline">OUTLINE</Button>
<Button variant="text">TEXT</Button>`,
	expanded: `${script('import { Button } from "@sveltique/components";')}

<Button>CONTAINED</Button>
<Button variant="outline">OUTLINE</Button>
<Button variant="text">TEXT</Button>`
};

export const shapeCode = {
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

export const sizeCode = {
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

export const colorCode = {
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

export const disabledCode = {
	short: `<Button disabled>Disabled Contained</Button>
<Button disabled variant="outline">Disabled Outline</Button>
<Button disabled variant="text">Disabled Text</Button>`,
	expanded: `${script('import { Button } from "@sveltique/components";')}

<Button disabled>Disabled Contained</Button>
<Button disabled variant="outline">Disabled Outline</Button>
<Button disabled variant="text">Disabled Text</Button>`
};
