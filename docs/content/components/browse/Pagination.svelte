<script lang="ts">
import { Badge, Pagination } from "@sveltique/components";
import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script('import { Pagination } from "@sveltique/components";')}

<Pagination.Root>
    <Pagination.Previous href="#"/>
    <Pagination.Item href="#">1</Pagination.Item>
    <Pagination.Item href="#" isActive>2</Pagination.Item>
    <Pagination.Item href="#">3</Pagination.Item>
    <Pagination.Ellipsis />
    <Pagination.Next href="#" />
</Pagination.Root>`;

const addTextCode = `${script('import { Pagination } from "@sveltique/components";')}

<Pagination.Root>
    <Pagination.Previous
        href="#"
        buttonVariants={{ shape: "rectangle" }}
    >
        Previous
    </Pagination.Previous>
    <Pagination.Next
        href="#"
        buttonVariants={{ shape: "rectangle" }}
    >
        Next
    </Pagination.Next>
</Pagination.Root>`;

const ariaLabelCode = `${script('import { Pagination } from "@sveltique/components";')}

<Pagination.Root>
    <Pagination.Item
        href="#"
        aria-label="Go to page 1"
    >
        1
    </Pagination.Item>
</Pagination.Root>`;
</script>

<h1 id="pagination">Pagination</h1>
<p>Enables navigation through a range of pages, with support for previous/next links and skipped pages.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground code={basicUsageCode}>
    <Pagination.Root>
        <Pagination.Previous href="#"/>
        <Pagination.Item href="#">1</Pagination.Item>
        <Pagination.Item href="#" isActive>2</Pagination.Item>
        <Pagination.Item href="#">3</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next href="#" />
    </Pagination.Root>
</Playground>

<h2 id="structure">Structure</h2>
<ul>
    <li>
        <Badge variant="secondary">Pagination.Root</Badge> : The container for pagination items.
    </li>
    <li>
        <Badge variant="secondary">Pagination.Item</Badge> : A clickable page link.
    </li>
    <li>
        <Badge variant="secondary">Pagination.Previous</Badge> : A shorthand for <Badge variant="secondary">
            Pagination.Item
        </Badge> with a "previous" icon (<IconChevronLeft class="inline size-5 shrink-0" />).
    </li>
    <li>
        <Badge variant="secondary">Pagination.Next</Badge> : A shorthand for <Badge variant="secondary">
            Pagination.Item
        </Badge> with a "next" icon (<IconChevronRight class="inline size-5 shrink-0" />).
    </li>
    <li>
        <Badge variant="secondary">Pagination.Ellipsis</Badge> : An inert placeholder showing skipped
        pages (...).
    </li>
</ul>

<h2 id="customization">Customization</h2>

<h3>Add text to previous/next</h3>
<p>
    You can add text to previous and next items by passing content to <Badge variant="secondary">children</Badge>.
</p>
<Playground code={addTextCode}>
    <Pagination.Root>
        <Pagination.Previous href="#" buttonVariants={{ shape: "rectangle" }}>
            Previous
        </Pagination.Previous>
        <Pagination.Next href="#" buttonVariants={{ shape: "rectangle" }}>
            Next
        </Pagination.Next>
    </Pagination.Root>
</Playground>

<h2>Accessibility</h2>
<p>For accessibility purposes, you should add a meaningful ARIA label on each item.</p>
<p>By default, the previous/next items respectively have "Previous page"/"Next page".</p>
<Playground code={ariaLabelCode}>
    <Pagination.Root>
        <Pagination.Item href="#" aria-label="Go to page 1">1</Pagination.Item>
    </Pagination.Root>
</Playground>
