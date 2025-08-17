<script>
	import Playground from '$components/Playground.svelte';
	import { Accordion, Badge } from '@sveltique/components';
	import IconArrowDown from '@tabler/icons-svelte/icons/arrow-down';
	import IconCaretDownFilled from '@tabler/icons-svelte/icons/caret-down-filled';
	import { defaultExpandCode, headingLevelCode } from './content';
	import CodeBlock from '$components/CodeBlock.svelte';
</script>

<h1>Accordion</h1>
<p>Lets users show and hide sections of related content on a page.</p>
<h2>Basic Usage</h2>
<p>
	An accordion is made of two items, a container {'<Accordion />'} and one or many items {'<AccordionItem />'}.
</p>
<Playground>
	<Accordion.Root class="max-w-md">
		<Accordion.Item>
			{#snippet summary()}
				What is this feature for?
			{/snippet}

			<p>
				This feature helps you organize and access your content more easily by grouping it into
				collapsible sections.
			</p>
		</Accordion.Item>

		<Accordion.Item>
			{#snippet summary()}
				Can I customize how it looks?
			{/snippet}

			<p>
				Yes! You can change colors, spacing, icons, and animations to match your design preferences.
			</p>
		</Accordion.Item>

		<Accordion.Item>
			{#snippet summary()}
				Will this work on mobile devices?
			{/snippet}

			<p>Absolutely. The accordion is fully responsive and works smoothly on all screen sizes.</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3>Expand Icon</h3>
<p>You can customize the expand icon by passing an <Badge>Icon</Badge> property.</p>
<Playground>
	<Accordion.Root class="max-w-md">
		<Accordion.Item Icon={IconArrowDown}>
			{#snippet summary()}
				What is this feature for?
			{/snippet}

			<p>
				This feature helps you organize and access your content more easily by grouping it into
				collapsible sections.
			</p>
		</Accordion.Item>

		<Accordion.Item Icon={IconCaretDownFilled}>
			{#snippet summary()}
				Will this work on mobile devices?
			{/snippet}

			<p>Absolutely. The accordion is fully responsive and works smoothly on all screen sizes.</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3>Expand by default</h3>
<p>You can expand the first item by default via the <Badge>defaultExpanded</Badge> attribute.</p>
<Playground code={defaultExpandCode}>
	<Accordion.Root defaultExpand class="max-w-md">
		<Accordion.Item>
			{#snippet summary()}
				Accordion 1
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>
		</Accordion.Item>
		<Accordion.Item>
			{#snippet summary()}
				Accordion 2
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas. Cum!
			</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h2>Customization</h2>
<h3>Only expand one at a time</h3>
<p>
	If you wish to keep only one accordion open at a time, you can set <Badge
		>{'multiple={false}'}</Badge
	>.
</p>
<Playground>
	<Accordion.Root multiple={false} class="max-w-md">
		<Accordion.Item>
			{#snippet summary()}
				What is this feature for?
			{/snippet}

			<p>
				This feature helps you organize and access your content more easily by grouping it into
				collapsible sections.
			</p>
		</Accordion.Item>
		<Accordion.Item>
			{#snippet summary()}
				Can I customize how it looks?
			{/snippet}

			<p>
				Yes! You can change colors, spacing, icons, and animations to match your design preferences.
			</p>
		</Accordion.Item>
		<Accordion.Item>
			{#snippet summary()}
				Will this work on mobile devices?
			{/snippet}

			<p>Absolutely. The accordion is fully responsive and works smoothly on all screen sizes.</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3>Heading level</h3>
<p>
	By default, accordion items use an <Badge>h3</Badge> element for the summary.
</p>
<p>
	You can change this to adapt it to your document hierarchy using the <Badge>headingLevel</Badge> attribute.
</p>
<CodeBlock code={headingLevelCode} />
