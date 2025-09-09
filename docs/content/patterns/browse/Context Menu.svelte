<script lang="ts">
import { Alert, Button, Kbd, Link, Paper, Separator } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

let containerRef = $state<HTMLDivElement>();
let contextMenuRef = $state<HTMLDivElement>();

let showContextMenu = $state(false);
let mousePosition = $state({ x: 0, y: 0 });

function openContextMenu(event: MouseEvent) {
	event.preventDefault();

	showContextMenu = true;
	mousePosition = { x: event.clientX, y: event.clientY };
}

function onGlobalMouseDown(event: MouseEvent) {
	if (!containerRef || !contextMenuRef) return;

	const target = event.target;
	if (!event.target || !(target instanceof HTMLElement) || contextMenuRef.contains(target)) {
		return;
	}

	closeContextMenu();
}

function closeContextMenu() {
	showContextMenu = false;
}

const implementationCode = `${script(`import { Button, Kbd, Paper, Separator } from "@sveltique/components";

    let containerRef = $state<HTMLDivElement>();
    let contextMenuRef = $state<HTMLDivElement>();

    let showContextMenu = $state(false);
    let mousePosition = $state({ x: 0, y: 0 });

    /** Opens the context menu and updates the mouse's position. */
    function openContextMenu(event: MouseEvent) {
        event.preventDefault();

        showContextMenu = true;
        mousePosition = { x: event.clientX, y: event.clientY };
    }

    /** Closes the context menu if a mouse down happened outside the context menu. */
    function onGlobalMouseDown(event: MouseEvent) {
        if (!containerRef || !contextMenuRef) return;

        const target = event.target;
        if (!event.target || !(target instanceof HTMLElement) || contextMenuRef.contains(target)) {
            return;
        }

        closeContextMenu();
    }

    function closeContextMenu() {
        showContextMenu = false;
    }`)}

<svelte:window onmousedown={onGlobalMouseDown} />

<div
    bind:this={containerRef}
    oncontextmenu={openContextMenu}
    aria-haspopup="menu"
    class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
>
    <p class="text-sm text-balance text-center text-muted-foreground">
        Right-click to open the context menu
    </p>
</div>

{#if showContextMenu}
    <Paper
        bind:ref={contextMenuRef}
        role="menu"
        style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
        class="fixed shadow-lg"
    >
        <div class="p-1.5">
            <Button
                onclick={closeContextMenu}
                variant="text"
                role="menuitem"
                class="w-full justify-start"
            >
                Open
            </Button>
            <Button
                onclick={closeContextMenu}
                variant="text"
                role="menuitem"
                class="w-full justify-start"
            >
                Rename
            </Button>
        </div>
        <Separator />
        <div class="p-1.5">
            <Button
                onclick={closeContextMenu}
                variant="text"
                role="menuitem"
                class="w-full justify-start"
            >
                Delete
            </Button>
        </div>
        <Separator />
        <div class="p-1.5">
            <Button
                onclick={closeContextMenu}
                variant="text"
                role="menuitem"
                class="w-full justify-start"
            >
                Inspect <Kbd class="ml-3">Ctrl+Shift+I</Kbd>
            </Button>
        </div>
    </Paper>
{/if}`;

const creatingContextMenuCode = `${script(`import { Button, Kbd, Paper, Separator } from "@sveltique/components";`)}

<Paper
    role="menu"
    class="fixed shadow-lg"
>
    <div class="p-1.5">
        <Button
            variant="text"
            role="menuitem"
            class="w-full justify-start"
        >
            Open
        </Button>
        <Button
            variant="text"
            role="menuitem"
            class="w-full justify-start"
        >
            Rename
        </Button>
    </div>
    <Separator />
    <div class="p-1.5">
        <Button
            variant="text"
            role="menuitem"
            class="w-full justify-start"
        >
            Delete
        </Button>
    </div>
    <Separator />
    <div class="p-1.5">
        <Button
            variant="text"
            role="menuitem"
            class="w-full justify-start"
        >
            Inspect <Kbd class="ml-3">Ctrl+Shift+I</Kbd>
        </Button>
    </div>
</Paper>`;

const creatingTriggerZone = `${script(`import { Button, Kbd, Paper, Separator } from "@sveltique/components";`)}

<div
    aria-haspopup="menu"
    class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
>
    <p class="text-sm text-balance text-center text-muted-foreground">
        Right-click to open the context menu
    </p>
</div>

<!-- The context menu... -->`;
</script>

<svelte:window onmousedown={onGlobalMouseDown} />

<h1 id="context-menu">Context Menu</h1>
<p>Provides a contextual menu of actions, triggered by a right-click inside a target area.</p>
<Alert class="mb-4">
    Only interested in the code ? See the <Link href="#final-component">final component</Link> code.
</Alert>
<Playground code={implementationCode}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        bind:this={containerRef}
        oncontextmenu={openContextMenu}
        aria-haspopup="menu"
        class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
    >
        <p class="text-sm text-balance text-center text-muted-foreground">
            Right-click to open the context menu
        </p>
    </div>

    {#if showContextMenu}
        <Paper
            bind:ref={contextMenuRef}
            role="menu"
            style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
            class="fixed shadow-lg"
        >
            <div class="p-1.5">
                <Button
                    onclick={closeContextMenu}
                    variant="text"
                    role="menuitem"
                    class="w-full justify-start"
                >
                    Open
                </Button>
                <Button
                    onclick={closeContextMenu}
                    variant="text"
                    role="menuitem"
                    class="w-full justify-start"
                >
                    Rename
                </Button>
            </div>
            <Separator />
            <div class="p-1.5">
                <Button
                    onclick={closeContextMenu}
                    variant="text"
                    role="menuitem"
                    class="w-full justify-start"
                >
                    Delete
                </Button>
            </div>
            <Separator />
            <div class="p-1.5">
                <Button
                    onclick={closeContextMenu}
                    variant="text"
                    role="menuitem"
                    class="w-full justify-start"
                >
                    Inspect <Kbd class="ml-3">Ctrl+Shift+I</Kbd>
                </Button>
            </div>
        </Paper>
    {/if}
</Playground>

<h2 id="requirements">Features</h2>
<ul>
    <li>The context menu only appears when right-clicking inside the target zone</li>
    <li>The menu is positioned at the mouse click (bottom right)</li>
    <li>Selecting an action or clicking anywhere outside the menu closes it</li>
</ul>

<h2 id="implementation">Implementation</h2>
<p>
    Below is a simple implementation of a custom context menu. Right-click inside the dashed zone to
    open it, then choose an action or click outside the menu to close.
</p>

<h3 id="creating-the-context-menu">Creating the context menu</h3>
<p>Let's start by making the actual context menu.</p>
<CodeBlock code={creatingContextMenuCode} showLineNumbers />

<h3 id="creating-the-trigger-zone">Creating the trigger zone</h3>
<p>Next, let's make the trigger zone of the context menu.</p>
<CodeBlock code={creatingTriggerZone} showLineNumbers highlightedLines="5-12" />
<!-- <CodeBlock code={implementationCode} showLineNumbers /> -->
