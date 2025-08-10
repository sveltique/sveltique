<script>
	import Playground from '$docs/Playground.svelte';
	import Badge from '$lib/components/data-display/badge/Badge.svelte';
	import Accordion from './Accordion.svelte';
	import AccordionItem from './AccordionItem.svelte';
	import IconArrowDown from '@tabler/icons-svelte/icons/arrow-down';
	import IconCaretDownFilled from '@tabler/icons-svelte/icons/caret-down-filled';
</script>

<h1>Accordion</h1>
<p>Lets users show and hide sections of related content on a page.</p>
<h2>Basic Usage</h2>
<p>
	An accordion is made of two items, a container {'<Accordion />'} and one or many items {'<AccordionItem />'}.
</p>
<Playground>
	<Accordion class="max-w-md">
		<AccordionItem>
			{#snippet summary()}
				What is this feature for?
			{/snippet}

			<p>
				This feature helps you organize and access your content more easily by grouping it into
				collapsible sections.
			</p>
		</AccordionItem>

		<AccordionItem>
			{#snippet summary()}
				Can I customize how it looks?
			{/snippet}

			<p>
				Yes! You can change colors, spacing, icons, and animations to match your design preferences.
			</p>
		</AccordionItem>

		<AccordionItem>
			{#snippet summary()}
				Will this work on mobile devices?
			{/snippet}

			<p>Absolutely. The accordion is fully responsive and works smoothly on all screen sizes.</p>
		</AccordionItem>
	</Accordion>
</Playground>

<h2>Icon</h2>
<p>You can customize the expand icon by passing an <Badge>Icon</Badge> property.</p>
<Playground>
	<Accordion>
		<AccordionItem Icon={IconArrowDown}>
			{#snippet summary()}
				What is this feature for?
			{/snippet}

			<p>
				This feature helps you organize and access your content more easily by grouping it into
				collapsible sections.
			</p>
		</AccordionItem>

		<AccordionItem Icon={IconCaretDownFilled}>
			{#snippet summary()}
				Will this work on mobile devices?
			{/snippet}

			<p>Absolutely. The accordion is fully responsive and works smoothly on all screen sizes.</p>
		</AccordionItem>
	</Accordion>
</Playground>
