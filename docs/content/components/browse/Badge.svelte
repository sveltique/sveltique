<script>
	import { badge, Badge } from '@sveltique/components';
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import IconCircleDashedCheck from '@tabler/icons-svelte/icons/circle-dashed-check';
	import IconTrash from '@tabler/icons-svelte/icons/trash';

	const basicUsagecode = {
		short: '<Badge>Groceries</Badge>',
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

<h1>Badge</h1>
<p>A small badge with rounded corners.</p>

<h2>Basic Usage</h2>
<Playground code={basicUsagecode}>
	<Badge>Contained</Badge>
	<Badge variant="outline">Outline</Badge>
	<Badge variant="danger">Danger</Badge>
</Playground>

<h3>Number</h3>
<p>
	If you want to use the badge with a number, you can set the <Badge>number</Badge> attribute to true.
	It will fully round the badge.
</p>
<Playground code={numberCode}>
	<Badge number>1</Badge>
	<Badge variant="outline" number>15</Badge>
	<Badge variant="danger" number>99+</Badge>
</Playground>

<h2>Examples</h2>

<h3>Icon with text</h3>
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

<h3>Interactive badge</h3>
<p>You can make an interactive badge by using the <Badge>badge()</Badge> helper.</p>
<Playground code={interactiveBadgeCode}>
	<a href="/" class={badge()}>Link</a>
	<button class={badge({ variant: 'danger', class: 'cursor-pointer' })}>Button</button>
</Playground>
