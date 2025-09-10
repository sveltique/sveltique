<script lang="ts">
import { Alert, Badge, Button, Kbd, Link, Paper, Separator } from "@sveltique/components";
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

const creatingContextMenuCode = `${script(`import { Button, Kbd, Paper, Separator } from "@sveltique/components";

    interface Props {
        /** Closes the current context menu. */
        close: () => void;
        /** The position of the mouse to position the context menu. */
        mousePosition: { x: number; y: number };
        /** The reference to the root container of the context menu. */
        ref: HTMLDivElement;
    }
    
    let { close, mousePosition, ref = $bindable() }: Props = $props();`)}

<Paper
    bind:ref
    role="menu"
    style="left: {mousePosition.x}px; top: {mousePosition.y}px;"
    class="fixed shadow-lg"
>
    <div class="p-1.5">
        <Button
            onclick={close}
            variant="text"
            role="menuitem"
            class="w-full justify-start"
        >
            Open
        </Button>
        <Button
            onclick={close}
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
            onclick={close}
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
            onclick={close}
            variant="text"
            role="menuitem"
            class="w-full justify-start"
        >
            Inspect <Kbd class="ml-3">Ctrl+Shift+I</Kbd>
        </Button>
    </div>
</Paper>`;

const creatingTriggerBox = `<div
    aria-haspopup="menu"
    class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
>
    <p class="text-sm text-balance text-center text-muted-foreground">
        Right-click to open the context menu
    </p>
</div>`;

const handlingStateCode = `${script(`import ContextMenu from "./ContextMenu.svelte";

    let showContextMenu = $state(false);
    let mousePosition = $state({ x: 0, y: 0 });

     /** Opens the context menu and updates the mouse position. */
    function openContextMenu(event: MouseEvent) {
        event.preventDefault();

        showContextMenu = true;
        mousePosition = { x: event.clientX, y: event.clientY };
    }
    
    function closeContextMenu() {
        showContextMenu = false;
    }`)}

<div
    oncontextmenu={openContextMenu}
    aria-haspopup="menu"
    class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
>
    <p class="text-sm text-balance text-center text-muted-foreground">
        Right-click to open the context menu
    </p>
</div>

{#if showContextMenu}
    <ContextMenu {mousePosition} close={closeContextMenu} />
{/if}`;

const closeOnOutsideClickCode = `${script(`import ContextMenu from "./ContextMenu.svelte";

    let containerRef = $state<HTMLDivElement>();
    let contextMenuRef = $state<HTMLDivElement>();

    let showContextMenu = $state(false);
    let mousePosition = $state({ x: 0, y: 0 });

    /** Opens the context menu and updates the mouse position. */
    function openContextMenu(event: MouseEvent) {
        event.preventDefault();

        showContextMenu = true;
        mousePosition = { x: event.clientX, y: event.clientY };
    }

    /** Closes the context menu if a click occurs outside of it. */
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
    bind:ref={containerRef}
    oncontextmenu={openContextMenu}
    aria-haspopup="menu"
    class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
>
    <p class="text-sm text-balance text-center text-muted-foreground">
        Right-click to open the context menu
    </p>
</div>

{#if showContextMenu}
    <ContextMenu bind:ref={contextMenuRef} {mousePosition} close={closeContextMenu} />
{/if}`;
</script>

<svelte:window onmousedown={onGlobalMouseDown} />

<h1 id="context-menu">Context Menu</h1>
<p>Provides a contextual menu of actions, triggered by a right-click inside a target area.</p>
<Alert class="mb-4">
    Only interested in the code ? See the preview's code.
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

<h2 id="component-structure">Component Structure</h2>
<ul>
    <li>
        A dedicated component for the context menu : <Badge variant="secondary">ContextMenu.svelte</Badge>
    </li>
    <li>
        The root component managing the trigger box and the context menu : <Badge variant="secondary">
            App.svelte
        </Badge>
    </li>
</ul>

<h2 id="implementation">Implementation</h2>
<p>
    Below is a simple implementation of a custom context menu. Right-click inside the dashed box to
    open it, then choose an action or click outside the menu to close.
</p>


<h3 id="creating-the-context-menu">Creating the context menu</h3>
<p>
    Let's start by making the actual context menu in a separate component, which will be <Badge variant="secondary">
        ContextMenu.svelte
    </Badge>.
</p>
<CodeBlock code={creatingContextMenuCode} showLineNumbers filename="ContextMenu.svelte" />

<h3 id="creating-the-trigger-box">Creating the trigger box</h3>
<p>Next, inside the root component, let's make the trigger box of the context menu.</p>
<CodeBlock code={creatingTriggerBox} showLineNumbers filename="App.svelte" />

<h3 id="handling-open-close-state">Handling open-closed state</h3>
<p>Now, let's handling the open-close state of the context menu. </p>
<p>
    We want to open the context menu on the bottom corner of the mouse when right-clicking inside the
    box. Next, we want to close the context menu whenever a button is clicked.
</p>
<CodeBlock code={handlingStateCode} showLineNumbers filename="App.svelte" highlightedLines="2-18,21,30-32" />

<h3 id="close-menu-on-outside-click">Close menu on outside click</h3>
<p>Finally, we want to close the menu when we click anywhere outside the context menu.</p>
<CodeBlock code={closeOnOutsideClickCode} showLineNumbers filename="App.svelte" highlightedLines="4-5,18-28,35,38,49" />
