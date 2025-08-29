<script module>
export const metadata = {
	description: "A small badge with rounded corners."
};
</script>

<script>
import { Badge, badge } from "@sveltique/components";
import IconCircleDashedCheck from "@tabler/icons-svelte/icons/circle-dashed-check";
import IconTrash from "@tabler/icons-svelte/icons/trash";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsagecode = {
	short: "<Badge>Groceries</Badge>",
	expanded: `${script('import { Badge } from "@sveltique/components";')}
        
<Badge>Contained</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="danger">Danger</Badge>`
};

const numberCode = `${script('import { Badge } from "@sveltique/components";')}
    
<Badge number>1</Badge>
<Badge variant="outline" number>15</Badge>
<Badge variant="danger" number>99+</Badge>`;

const iconWithTextCode = `${script(`import { Badge } from '@sveltique/components';
    import IconCircleDashedCheck from '@tabler/icons-svelte/icons/circle-dashed-check';
    import IconTrash from '@tabler/icons-svelte/icons/trash';`)}
    
<Badge>
    <IconCircleDashedCheck class="size-4" />
    Verified
</Badge>
<Badge variant="danger">
    <IconTrash class="size-4" />
    Delete
</Badge>`;

const interactiveBadgeCode = `${script("import { badge } from '@sveltique/components';")}

<a href="/" class={badge()}>Link</a>
<button class={badge({ variant: 'danger' })}>Button</button>`;
</script>

<h1 id="badge">Badge</h1>
<p>A small badge with rounded corners.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsagecode}>
	<Badge>Contained</Badge>
	<Badge variant="outline">Outline</Badge>
	<Badge variant="danger">Danger</Badge>
</Playground>

<h3 id="number">Number</h3>
<p>
	If you want to use the badge with a number, you can set the <Badge>number</Badge> attribute to true.
	It will fully round the badge.
</p>
<Playground code={numberCode}>
	<Badge number>1</Badge>
	<Badge variant="outline" number>15</Badge>
	<Badge variant="danger" number>99+</Badge>
</Playground>

<h2 id="examples">Examples</h2>

<h3 id="icon-with-text">Icon with text</h3>
<Playground code={iconWithTextCode}>
	<Badge>
		<IconCircleDashedCheck aria-hidden="true" class="size-4" />
		Verified
	</Badge>
	<Badge variant="danger">
		<IconTrash aria-hidden="true" class="size-4" />
		Delete
	</Badge>
</Playground>

<h3 id="interactive-badge">Interactive badge</h3>
<p>You can make an interactive badge by using the <Badge>badge()</Badge> helper.</p>
<Playground code={interactiveBadgeCode}>
	<a href="/" class={badge()}>Link</a>
	<button class={badge({ variant: 'danger', class: 'cursor-pointer' })}>Button</button>
</Playground>
