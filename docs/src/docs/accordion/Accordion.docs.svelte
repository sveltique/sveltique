<script>
	import Playground from '$components/Playground.svelte';
	import { Accordion, Badge } from '@sveltique/components';
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

<h2>Icon</h2>
<p>You can customize the expand icon by passing an <Badge>Icon</Badge> property.</p>
<Playground>
	<Accordion.Root>
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
