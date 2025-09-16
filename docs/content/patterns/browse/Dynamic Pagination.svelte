<script lang="ts">
import { Alert, Badge, Link, Pagination } from "@sveltique/components";
import { innerWidth } from "svelte/reactivity/window";
import { page } from "$app/state";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

let totalPages = $state(10);
let activePage = $derived(Number(page.url.searchParams.get("page") ?? 1));

let isDesktop = $derived(!!innerWidth.current && innerWidth.current > 640);

/** A helper to navigate between pages. */
function toPage(newPage: number) {
	const searchParams = new URLSearchParams(page.url.searchParams);
	searchParams.set("page", String(newPage));

	return `?${searchParams.toString()}`;
}

const previewCode = `${script(`import { Pagination } from "@sveltique/components";
        
    // You would typically receive this data from the backend or API
    let totalPages = $state(10);
    let activePage = $derived.by(() => {
        const current = page.url.searchParams.get("page") ?? 1;
        return Number(current);
    });

    let isDesktop = $derived(!!innerWidth.current && innerWidth.current > 640);
    
    /** A helper to navigate between pages. */
    function toPage(newPage: number) {
        const searchParams = new URLSearchParams(page.url.searchParams);
        searchParams.set("page", String(newPage));

        return \`?\${searchParams.toString()}\`;
    }`)}

<Pagination.Root>
    {#if activePage > 1}
        <Pagination.Previous href={toPage(activePage - 1)} />
    {/if}

    <!-- Saving some space on mobile -->
    {#if isDesktop}
        {#if activePage > 2}
            <Pagination.Item href={toPage(1)}>1</Pagination.Item>
        {/if}

        {#if activePage > 3}
            <Pagination.Ellipsis />
        {/if}
    {/if}

    {#each [activePage - 1, activePage, activePage + 1] as pageNum (pageNum)}
        {#if pageNum >= 1 && pageNum <= totalPages}
            <Pagination.Item href={toPage(pageNum)} isActive={pageNum === activePage}>
                {pageNum}
            </Pagination.Item>
        {/if}
    {/each}

    <!-- Saving some space on mobile -->
    {#if isDesktop}
        {#if activePage + 2 < totalPages}
            <Pagination.Ellipsis />
        {/if}

        {#if activePage + 1 < totalPages}
            <Pagination.Item href={toPage(totalPages)}>
                {totalPages}
            </Pagination.Item>
        {/if}
    {/if}

    {#if activePage < totalPages}
        <Pagination.Next href={toPage(activePage + 1)} />
    {/if}
</Pagination.Root>`;

const customPaginationCode = `${script(`import { Pagination } from "@sveltique/components";
    
    interface Props {
        activePage: number;
        totalPages: number; 
    }
        
    let { activePage, totalPages }: Props = $props();

    let isDesktop = $derived(!!innerWidth.current && innerWidth.current > 640);
    
    /** A helper to navigate between pages. */
    function toPage(newPage: number) {
        const searchParams = new URLSearchParams(page.url.searchParams);
        searchParams.set("page", String(newPage));

        return \`?\${searchParams.toString()}\`;
    }`)}

<Pagination.Root>
    {#if activePage > 1}
        <Pagination.Previous href={toPage(activePage - 1)} />
    {/if}

    <!-- Saving some space on mobile -->
    {#if isDesktop}
        {#if activePage > 2}
            <Pagination.Item href={toPage(1)}>1</Pagination.Item>
        {/if}

        {#if activePage > 3}
            <Pagination.Ellipsis />
        {/if}
    {/if}

    {#each [activePage - 1, activePage, activePage + 1] as pageNum (pageNum)}
        {#if pageNum >= 1 && pageNum <= totalPages}
            <Pagination.Item href={toPage(pageNum)} isActive={pageNum === activePage}>
                {pageNum}
            </Pagination.Item>
        {/if}
    {/each}

    <!-- Saving some space on mobile -->
    {#if isDesktop}
        {#if activePage + 2 < totalPages}
            <Pagination.Ellipsis />
        {/if}

        {#if activePage + 1 < totalPages}
            <Pagination.Item href={toPage(totalPages)}>
                {totalPages}
            </Pagination.Item>
        {/if}
    {/if}

    {#if activePage < totalPages}
        <Pagination.Next href={toPage(activePage + 1)} />
    {/if}
</Pagination.Root>`;

const usingPaginationCode = `${script(`import CustomPagination from "./CustomPagination.svelte";

    // You would typically receive this data from the backend or API
    let totalPages = $state(10);
    let activePage = $derived.by(() => {
        const current = page.url.searchParams.get("page") ?? 1;
        return Number(current);
    });`)}

<CustomPagination {activePage} {totalPages} />`;
</script>

<h1 id="dynamic-pagination">Dynamic Pagination</h1>
<p>
    Integrates a <Link href="/docs/components/browse/pagination">Pagination</Link> component with dynamic
    data and responsive layout.
</p>
<div class="mb-4">
    <p class="italic text-sm text-muted-foreground">
        Note: On mobile, fewer pagination items are shown to save space.
    </p>
</div>
<Alert class="mb-4">
    Only want the code? Check the inline preview below.
</Alert>
<Playground code={previewCode}>
    <Pagination.Root>
        {#if activePage > 1}
            <Pagination.Previous href={toPage(activePage - 1)} />
        {/if}

        {#if isDesktop}
            {#if activePage > 2}
                <Pagination.Item href={toPage(1)}>1</Pagination.Item>
            {/if}

            {#if activePage > 3}
                <Pagination.Ellipsis />
            {/if}
        {/if}

        {#each [activePage - 1, activePage, activePage + 1] as pageNum (pageNum)}
            {#if pageNum >= 1 && pageNum <= totalPages}
                <Pagination.Item href={toPage(pageNum)} isActive={pageNum === activePage}>
                    {pageNum}
                </Pagination.Item>
            {/if}
        {/each}

        {#if isDesktop}
            {#if activePage + 2 < totalPages}
                <Pagination.Ellipsis />
            {/if}

            {#if activePage + 1 < totalPages}
                <Pagination.Item href={toPage(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            {/if}
        {/if}

        {#if activePage < totalPages}
            <Pagination.Next href={toPage(activePage + 1)} />
        {/if}
    </Pagination.Root>
</Playground>

<h2 id="features">Features</h2>
<ul>
    <li>Shows fewer items on mobile, full range on desktop</li>
    <li>Compact representation for skipped pages using ellipsis</li>
    <li>Includes previous and next navigation controls</li>
</ul>

<h2 id="structure">Structure</h2>
<ul>
    <li>
        A dedicated <Badge variant="secondary">CustomPagination.svelte</Badge> component that renders
        the items based on the current page and window size
    </li>
    <li>
        A root <Badge variant="secondary">App.svelte</Badge> component managing the state and rendering
        the custom pagination
    </li>
</ul>

<h2 id="implementation">Implementation</h2>

<h3 id="custom-pagination">Custom pagination</h3>
<p>
    You can define your own pagination strategy by controlling which page
    numbers are rendered, when/if ellipses appear, and how page changes are handled 
    (via query string, in-memory state, etc.).
</p>
<p>In this example, we use the query string method.</p>
<CodeBlock code={customPaginationCode} showLineNumbers filename="CustomPagination.svelte" />

<h3 id="using-the-pagination">Using the pagination</h3>
<p>
    Now we can pass <Badge variant="secondary">activePage</Badge> and <Badge variant="secondary">totalPages</Badge> 
    to our custom pagination component.
</p>
<CodeBlock code={usingPaginationCode} showLineNumbers filename="App.svelte" />
