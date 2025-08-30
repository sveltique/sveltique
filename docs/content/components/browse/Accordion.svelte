<script module>
export const metadata = {
	description: "Lets users show and hide sections of related content on a page."
};
</script>

<script>
	import { Accordion, Badge } from '@sveltique/components';
	import Playground from '$components/Playground.svelte';
	import CodeBlock from '$components/CodeBlock.svelte';
	import IconArrowDown from '@tabler/icons-svelte/icons/arrow-down';
	import IconCaretDownFilled from '@tabler/icons-svelte/icons/caret-down-filled';
	import { script } from '$utils/playground';

	const basicCode = `${script('import { Accordion } from "@sveltique/components";')}

<Accordion.Root>
    <Accordion.Item>
        {#snippet header()}
            Accordion 1
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptate impedit deserunt amet officia qui tenetur
            laboriosam consequatur incidunt, voluptatum atque.
        </p>
    </Accordion.Item>
    <Accordion.Item>
        {#snippet header()}
            Accordion 2
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eos sequi consectetur dolores libero tempora ducimus
            perferendis iste qui voluptas. Cum!
        </p>
    </Accordion.Item>
</Accordion.Root>`;

	const expandIconCode = `${script('import { Accordion } from "@sveltique/components";')}

<Accordion.Root>
    <Accordion.Item Icon={IconArrowDown}>
        {#snippet header()}
            Accordion 1
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptate impedit deserunt amet officia qui tenetur
            laboriosam consequatur incidunt, voluptatum atque.
        </p>
    </Accordion.Item>
    <Accordion.Item Icon={IconCaretDownFilled}>
        {#snippet header()}
            Accordion 2
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eos sequi consectetur dolores libero tempora ducimus
            perferendis iste qui voluptas. Cum!
        </p>
    </Accordion.Item>
</Accordion.Root>`;

	const defaultExpandCode = `${script('import { Accordion } from "@sveltique/components";')}

<Accordion.Root defaultExpand>
    <Accordion.Item>
        {#snippet header()}
            Accordion 1
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptate impedit deserunt amet officia qui tenetur
            laboriosam consequatur incidunt, voluptatum atque.
        </p>
    </Accordion.Item>
    <Accordion.Item>
        {#snippet header()}
            Accordion 2
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eos sequi consectetur dolores libero tempora ducimus
            perferendis iste qui voluptas. Cum!
        </p>
    </Accordion.Item>
</Accordion.Root>`;

	const headingLevelCode = `<!-- The headers will now use an h4 element -->
<Accordion.Root headingLevel="h4">
    <Accordion.Item>
        {#snippet header()}
            Accordion 1
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptate impedit deserunt amet officia qui tenetur
            laboriosam consequatur incidunt, voluptatum atque.
        </p>
    </Accordion.Item>
</Accordion.Root>`;
</script>

<h1 id="accordion">Accordion</h1>
<p>Lets users show and hide sections of related content on a page.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>
	An accordion is made of two items, a container <code>{'<Accordion.Root />'}</code> and one or many
    items <code>{'<Accordion.Item />'}</code>.
</p>
<Playground code={basicCode}>
	<Accordion.Root class="max-w-md">
		<Accordion.Item>
			{#snippet header()}
				Accordion 1
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>
		</Accordion.Item>
		<Accordion.Item>
			{#snippet header()}
				Accordion 2
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas. Cum!
			</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3 id="expand-icon">Expand Icon</h3>
<p>You can customize the expand icon by passing an <Badge>Icon</Badge> property.</p>
<Playground code={expandIconCode}>
	<Accordion.Root class="max-w-md">
		<Accordion.Item>
			{#snippet header()}
				Accordion 1
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>

            {#snippet icon({ css })}
                <IconArrowDown class={css} />
            {/snippet}
		</Accordion.Item>
		<Accordion.Item>
			{#snippet header()}
				Accordion 2
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas. Cum!
			</p>

            {#snippet icon({ css })}
                <IconCaretDownFilled class={css} />
            {/snippet}
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3 id="expand-by-default">Expand by default</h3>
<p>You can expand the first item by default via the <Badge>defaultExpand</Badge> attribute.</p>
<Playground code={defaultExpandCode}>
	<Accordion.Root defaultExpand class="max-w-md">
		<Accordion.Item>
			{#snippet header()}
				Accordion 1
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>
		</Accordion.Item>
		<Accordion.Item>
			{#snippet header()}
				Accordion 2
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas. Cum!
			</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h2 id="customization">Customization</h2>
<h3 id="only-expand-one-at-a-time">Only expand one at a time</h3>
<p>
	If you wish to keep only one accordion open at a time, you can set <Badge
		>{'multiple={false}'}</Badge
	>.
</p>
<Playground>
	<Accordion.Root multiple={false} class="max-w-md">
		<Accordion.Item>
			{#snippet header()}
				Accordion 1
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>
		</Accordion.Item>
		<Accordion.Item>
			{#snippet header()}
				Accordion 2
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas. Cum!
			</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3 id="heading-level">Heading level</h3>
<p>
	By default, accordion items use an <Badge>h3</Badge> element for the header.
</p>
<p>
	You can change this to adapt it to your document hierarchy using the <Badge>headingLevel</Badge> attribute.
</p>
<CodeBlock code={headingLevelCode} />
