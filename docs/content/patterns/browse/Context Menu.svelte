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
        if (
            !event.target ||
            !(target instanceof HTMLElement) ||
            contextMenuRef.contains(target)
        ) {
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

const creatingTriggerArea = `<div
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
        if (
            !event.target ||
            !(target instanceof HTMLElement) ||
            contextMenuRef.contains(target)
        ) {
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
    <ContextMenu
        bind:ref={contextMenuRef}
        {mousePosition}
        close={closeContextMenu}
    />
{/if}`;
</script>

<svelte:window onmousedown={onGlobalMouseDown} />

<h1 id="context-menu">Context Menu</h1>
<p>Provides a contextual menu of actions, triggered by right-clicking inside a target area.</p>
<Alert class="mb-4">
    Only want the code? Check the inline preview below.
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
    <li>Appears only when right-clicking inside the target area</li>
    <li>Positions itself at the mouse cursor</li>
    <li>Closes when selecting an action or clicking outside the menu</li>
</ul>

<h2 id="component-structure">Component Structure</h2>
<ul>
    <li>
        A dedicated <Badge variant="secondary">ContextMenu.svelte</Badge> component for the context menu
    </li>
    <li>
        <Badge variant="secondary">App.svelte</Badge> as the root component managing the trigger area and
        the context menu
    </li>
</ul>

<h2 id="implementation">Implementation</h2>

<h3 id="creating-the-context-menu">Creating the context menu</h3>
<p>
    Let's start by making the actual context menu in a separate component, which will be <Badge variant="secondary">
        ContextMenu.svelte
    </Badge>.
</p>
<p>We are also exposing a few properties which we will use later.</p>
<Alert class="mb-4">
    Currently, the buttons are placeholders, as they only close the context menu. In your implementation,
    run your own logic first, then call <Badge variant="secondary">close</Badge>.
</Alert>
<CodeBlock code={creatingContextMenuCode} showLineNumbers filename="ContextMenu.svelte" />

<h3 id="creating-the-trigger-area">Creating the trigger area</h3>
<p>Next, in the root component, create the trigger area that will open the context menu.</p>
<CodeBlock code={creatingTriggerArea} showLineNumbers filename="App.svelte" />

<h3 id="handling-open-close-state">Handling open/close state</h3>
<p>Now, let’s handle the open/close state of the context menu.</p>
<p>
    We want the menu to appear at the mouse cursor when right-clicking inside the area. It should close
    whenever a menu action is selected.
</p>
<CodeBlock code={handlingStateCode} showLineNumbers filename="App.svelte" highlightedLines="2-17,21,30-32" />

<h3 id="closing-on-outside-click">Closing on outside click</h3>
<p>Finally, let’s close the menu whenever a click happens outside of it.</p>
<CodeBlock code={closeOnOutsideClickCode} showLineNumbers filename="App.svelte" highlightedLines="4-5,18-32,39,42,54" />
