<script lang="ts">
import { Button, Link } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { toasts } from "$lib/contexts/toast.svelte";
import { script } from "$utils/playground";

const usageCode = `${script(`import { Button } from "@sveltique/components";
    import { toasts } from "$lib/toasts/toast.svelte.ts";
    
    function onclick() {
        toasts.add({
            type: "success",
            content: "I'm a toast !"
        });
    }`)}
    
<Button {onclick}>
    Add a toast
</Button>`;

const logicCode = `import type { ToastVariants } from "@sveltique/components";

interface AddData {
    /** @default 'info' */
    type?: ToastVariants["type"];
    content: string;
}

interface ToastData extends Required<AddData> {
    id: string;
}

class Toasts {
    private _current = $state<ToastData[]>([]);

    get current() {
        return this._current;
    }

    public add(data: AddData) {
        const { type = "info", content } = data;

        const id = crypto.randomUUID();

        this._current.push({ id, type, content });

        setTimeout(() => {
            this._current = this._current.filter((toast) => toast.id !== id);
        }, 3000);
    }
}

export const toasts = new Toasts();`;

const rootContainerCode = `<svelte:options runes />

${script(`import { Toast } from "@sveltique/components";
    import { toasts } from "./toast.svelte.ts";`)}

<div
    role="status"
    aria-live="polite"
    class="fixed right-6 bottom-6 z-[1000] flex w-[calc(100%-3rem)] sm:max-w-xs flex-col justify-center gap-2"
>
    {#each toasts.current as { id, type, content } (id)}
        <div
            animate:flip={{ duration: 150 }}
            transition:fly={{ x: 50, duration: 200 }}
        >
            <Toast {type}>
                {content}
            </Toast>
        </div>
    {/each}
</div>`;

const mountContainerCode = `${script(`import "../app.css";
    import ToastContainer from "$lib/toasts/ToastContainer.svelte";
    
    let { children } = $props();`)}

<ToastContainer />
{@render children()}`;
</script>

<h1 id="programmatic-toasts">Programmatic Toasts</h1>
<p>
    While <Link href="/docs/components/browse/toast">static toasts</Link> are useful, creating them
    programmatically lets you show notifications in response to events or user actions.
</p>
<Playground code={usageCode}>
    <Button onclick={() => toasts.add({ type: "success", content: "I'm a toast !" })}>
        Add a toast
    </Button>
</Playground>

<h2 id="features">Features</h2>
<ul>
    <li>Created programmatically (e.g. via button click)</li>
    <li>Stacked vertically in the bottom-right corner of the screen</li>
    <li>Automatically dismissed after 3 seconds</li>
    <li>Announced to assistive technologies via ARIA live regions</li>
</ul>

<h2 id="implementation">Implementation</h2>

<h3 id="handling-toast-logic">Handling toast logic</h3>
<p>
    First, let's handle the logic. We'll make a class that stores the list of current toasts, a method
    to add them and a timeout after 3 seconds.
</p>
<CodeBlock code={logicCode} lang="ts" showLineNumbers filename="toast.svelte.ts" />

<h3 id="creating-the-root-container">Creating the root container</h3>
<p>
    Next, we create a root container for the toasts. This container will hold and display all toast
    notifications, and you typically only need one instance in your application.
</p>
<CodeBlock code={rootContainerCode} showLineNumbers filename="ToastContainer.svelte" />

<h3 id="mounting-the-root-container">Mounting the root container</h3>
<p>
    Finally, place the container in your app’s root layout so it’s available throughout your application.
</p>
<CodeBlock code={mountContainerCode} showLineNumbers filename="+layout.svelte" />
