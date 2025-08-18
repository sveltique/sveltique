import { script } from '$utils/playground';

export const basicCode = `${script('import { Accordion } from "@sveltique/components";')}

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

export const expandIconCode = `${script('import { Accordion } from "@sveltique/components";')}

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

export const defaultExpandCode = `${script('import { Accordion } from "@sveltique/components";')}

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

export const headingLevelCode = `<!-- The headers will now use an h4 element -->
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
