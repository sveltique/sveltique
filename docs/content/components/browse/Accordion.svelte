<script module>
export const metadata = {
	description: "Lets users show and hide sections of related content on a page."
};
</script>

<script lang="ts">
	import { Accordion, Badge } from '@sveltique/components';
	import Playground from '$components/Playground.svelte';
	import CodeBlock from '$components/CodeBlock.svelte';
	import IconAerialLiftFilled from '@tabler/icons-svelte/icons/aerial-lift-filled';
	import IconArrowDown from '@tabler/icons-svelte/icons/arrow-down';
	import IconCaretDownFilled from '@tabler/icons-svelte/icons/caret-down-filled';
	import IconLockFilled from '@tabler/icons-svelte/icons/lock-filled';
	import { script } from '$utils/playground';

	const basicCode = `${script('import { Accordion } from "@sveltique/components";')}

<Accordion.Root>
    <Accordion.Item header="Accordion 1">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptate impedit deserunt amet officia qui tenetur
            laboriosam consequatur incidunt, voluptatum atque.
        </p>
    </Accordion.Item>
    <Accordion.Item header="Accordion 2">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eos sequi consectetur dolores libero tempora ducimus
            perferendis iste qui voluptas.
        </p>
    </Accordion.Item>
</Accordion.Root>`;

    const complexHeadersCode = `${script('import { Accordion } from "@sveltique/components";')}
    
<Accordion.Root class="max-w-md">
    <Accordion.Item>
        {#snippet header()}
            <div class="relative flex items-center gap-3">
                <IconLockFilled /> Accordion 1
            </div>
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
            officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
        </p>
    </Accordion.Item>
    <Accordion.Item>
        {#snippet header()}
            <div class="relative flex items-center gap-3">
                <IconAerialLiftFilled /> Accordion 2
            </div>
        {/snippet}

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
            libero tempora ducimus perferendis iste qui voluptas.
        </p>
    </Accordion.Item>
</Accordion.Root>`

	const expandIconCode = `${script('import { Accordion } from "@sveltique/components";')}

<Accordion.Root>
    <Accordion.Item header="Accordion 1">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptate impedit deserunt amet officia qui tenetur
            laboriosam consequatur incidunt, voluptatum atque.
        </p>

        <!-- { "aria-hidden": true, class: string } -->
        {#snippet icon({ props })}
            <IconArrowDown {...props} />
        {/snippet}
    </Accordion.Item>
    <Accordion.Item header="Accordion 2">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eos sequi consectetur dolores libero tempora ducimus
            perferendis iste qui voluptas.
        </p>

        <!-- { "aria-hidden": true, class: string } -->
        {#snippet icon({ props })}
            <IconCaretDownFilled {...props} />
        {/snippet}
    </Accordion.Item>
</Accordion.Root>`;

	const defaultExpandCode = `${script('import { Accordion } from "@sveltique/components";')}

<Accordion.Root defaultExpand>
    <Accordion.Item header="Accordion 1">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptate impedit deserunt amet officia qui tenetur
            laboriosam consequatur incidunt, voluptatum atque.
        </p>
    </Accordion.Item>
    <Accordion.Item header="Accordion 2">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eos sequi consectetur dolores libero tempora ducimus
            perferendis iste qui voluptas.
        </p>
    </Accordion.Item>
</Accordion.Root>`;

    const onlyExpandOneAtATimeCode = `${script('import { Accordion } from "@sveltique/components";')}
    
<Accordion.Root multiple={false} class="max-w-md">
    <Accordion.Item header="Accordion 1">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
            officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
        </p>
    </Accordion.Item>
    <Accordion.Item header="Accordion 2">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
            libero tempora ducimus perferendis iste qui voluptas.
        </p>
    </Accordion.Item>
</Accordion.Root>`;

	const headingLevelCode = `<!-- The headers will now use an h4 element -->
<Accordion.Root headingLevel="h4">
    <Accordion.Item header="Accordion 1">
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
		<Accordion.Item header="Accordion 1">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>
		</Accordion.Item>
		<Accordion.Item header="Accordion 2">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas.
			</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3 id="complex-headers">Complex headers</h3>
<p>If your accordion header doesn't only contain text, you can pass a header snippet instead.</p>
<Playground code={complexHeadersCode}>
	<Accordion.Root class="max-w-md">
		<Accordion.Item>
            {#snippet header()}
				<div class="relative flex items-center gap-3">
                    <IconLockFilled /> Accordion 1
                </div>
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>
		</Accordion.Item>
		<Accordion.Item>
            {#snippet header()}
                <div class="relative flex items-center gap-3">
				    <IconAerialLiftFilled /> Accordion 2
                </div>
			{/snippet}

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas.
			</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h2 id="customization">Customization</h2>

<h3 id="expand-icon">Icon</h3>
<p>You can customize the expand icon by using the <Badge variant="secondary">icon</Badge> snippet on the items.</p>
<Playground code={expandIconCode}>
	<Accordion.Root class="max-w-md">
		<Accordion.Item header="Accordion 1">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>

            {#snippet icon({ props })}
                <IconArrowDown {...props} />
            {/snippet}
		</Accordion.Item>
		<Accordion.Item header="Accordion 2">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas.
			</p>

            {#snippet icon({ props })}
                <IconCaretDownFilled {...props} />
            {/snippet}
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3 id="expand-by-default">Expand by default</h3>
<p>You can expand the first item by default via the <Badge variant="secondary">defaultExpand</Badge> attribute on the root container.</p>
<Playground code={defaultExpandCode}>
	<Accordion.Root defaultExpand class="max-w-md">
		<Accordion.Item header="Accordion 1">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>
		</Accordion.Item>
		<Accordion.Item header="Accordion 2">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas.
			</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h3 id="only-expand-one-at-a-time">Only expand one at a time</h3>
<p>
	If you wish to keep only one accordion open at a time, you can set <Badge variant="secondary">multiple</Badge> to false.
</p>
<Playground code={onlyExpandOneAtATimeCode}>
	<Accordion.Root multiple={false} class="max-w-md">
		<Accordion.Item header="Accordion 1">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate impedit deserunt amet
				officia qui tenetur laboriosam consequatur incidunt, voluptatum atque.
			</p>
		</Accordion.Item>
		<Accordion.Item header="Accordion 2">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi consectetur dolores
				libero tempora ducimus perferendis iste qui voluptas.
			</p>
		</Accordion.Item>
	</Accordion.Root>
</Playground>

<h2 id="accessibility">Accessibility</h2>

<h3 id="heading-level">Heading level</h3>
<p>
	By default, accordion items use an <Badge variant="secondary">h3</Badge> element for the header.
</p>
<p>
	You can change this to adapt it to your document hierarchy using the <Badge variant="secondary">headingLevel</Badge>
    attribute. Permitted values are h1 to h6.
</p>
<CodeBlock code={headingLevelCode} />
