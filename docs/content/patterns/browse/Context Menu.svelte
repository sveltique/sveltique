<script lang="ts">
import { Badge, Button, Kbd, Paper, Separator } from "@sveltique/components";
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

function closeContextMenuOnInspector(event: KeyboardEvent) {
	if (!event.ctrlKey || !event.shiftKey || event.key !== "I") return;

	closeContextMenu();
}

const makingTheContextMenuCode = `${script(`import { Button, Kbd, Paper, Separator } from "@sveltique/components";

    interface Props {
        onclose: () => void;
    }
    
    let { onclose }: Props = $props();`)}

<Paper>
    <div class="p-1.5">
        <Button
            onclick={onclose}
            variant="text"
            class="w-full justify-start"
        >
            Open
        </Button>
        <Button
            onclick={onclose}
            variant="text"
            class="w-full justify-start"
        >
            Rename
        </Button>
    </div>
    <Separator />
    <div class="p-1.5">
        <Button
            onclick={onclose}
            variant="text"
            class="w-full justify-start"
        >
            Delete
        </Button>
    </div>
    <Separator />
    <div class="p-1.5">
        <Button
            onclick={onclose}
            variant="text"
            class="w-full justify-start flex items-center gap-5"
        >
            Inspect <Kbd>Ctrl+Shift+I</Kbd>
        </Button>
    </div>
</Paper>`;
</script>

<svelte:window onmousedown={onGlobalMouseDown} onkeydown={closeContextMenuOnInspector} />

<h1 id="context-menu">Context Menu</h1>
<p>Learn to make context menu.</p>
<p>Requirements :</p>
<ul>
    <li>The context menu only appears when right-clicking in a box</li>
    <li>The context menu appears at the bottom right of the mouse click</li>
    <li>Clicking on an action closes the context menu</li>
    <li>Mouse down outside the context menu closes it</li>
</ul>
<Playground>
    <div
        bind:this={containerRef}
        oncontextmenu={openContextMenu}
        role="presentation"
        class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
    >
        <p class="text-sm text-balance text-center text-muted-foreground">
            Right-click to open the context menu
        </p>
    </div>

    {#if showContextMenu}
        <Paper
            bind:ref={contextMenuRef}
            style="top: {mousePosition.y}px; left: {mousePosition.x}px;"
            class="fixed shadow-lg"
        >
            <div class="p-1.5">
                <Button
                    onclick={closeContextMenu}
                    variant="text"
                    class="w-full justify-start"
                >
                    Open
                </Button>
                <Button
                    onclick={closeContextMenu}
                    variant="text"
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
                    class="w-full justify-start flex items-center gap-5"
                >
                    Inspect <Kbd>Ctrl+Shift+I</Kbd>
                </Button>
            </div>
        </Paper>
    {/if}
</Playground>

<h2>Process</h2>

<h3>Making the context menu</h3>
<p>
    Let's start by defining our context menu in <Badge variant="secondary">
        $lib/components/ContextMenu.svelte
    </Badge>. It will handle simple buttons.
</p>
<Playground code={makingTheContextMenuCode}>
    <Paper class="shadow-lg">
        <div class="p-1.5">
            <Button
                onclick={closeContextMenu}
                variant="text"
                class="w-full justify-start"
            >
                Open
            </Button>
            <Button
                onclick={closeContextMenu}
                variant="text"
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
                class="w-full justify-start flex items-center gap-5"
            >
                Inspect <Kbd class="text-sm">Ctrl+Shift+I</Kbd>
            </Button>
        </div>
    </Paper>
</Playground>

<h3>Context Menu Zone</h3>
<p>Next, let's define the zone where our custom context menu will appear.</p>
<Playground>
    <div
        role="presentation"
        class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
    >
        <p class="text-sm text-balance text-center text-muted-foreground">
            Right-click to open the context menu
        </p>
    </div>
</Playground>

<h3>Combining</h3>
<p>Finally, let's combine both our zone and our context menu. We only want our </p>

