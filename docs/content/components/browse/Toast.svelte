<script module>
export const metadata = {
	description: "Brief notifications of processes that have been or will be performed."
};
</script>

<script lang="ts">
import { Alert, Badge, Button, Toast } from "@sveltique/components";
import CodeBlock from "$components/CodeBlock.svelte";
import Playground from "$components/Playground.svelte";
import { toasts } from "$lib/contexts/toast.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script("import { Toast } from '@sveltique/components';")}
    
<Toast type="info" class="max-w-96">
    This feature is not implemented yet.
</Toast>
<Toast type="success" class="max-w-96">
    Post added successfully.
</Toast>
<Toast type="warning" class="max-w-96">
    You will be disconnected in 5 minutes.
</Toast>
<Toast type="danger" class="max-w-96">
    An unknown error occurred.
</Toast>`;

const actionCode = `${script("import { Button, Toast } from '@sveltique/components';")}

<Toast type="warning" onClose={() => {}} class="max-w-96">
    Your session will expire soon.
</Toast>
<Toast type="success" class="max-w-96">
    Your post has been deleted successfully.

    {#snippet action()}
        <Button variant="text" size="small">Undo</Button>
    {/snippet}
</Toast>`

const programmaticCallsCode = {
    logic: `import type { ToastVariants } from "@sveltique/components";

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

export const toasts = new Toasts();`,
    rootContainer: `<svelte:options runes={true} />

${script(`import { Toast } from "@sveltique/components";
    import { toasts } from "path/to/toasts";`)}

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
</div>`,
    usage: `${script(`import { Button } from "@sveltique/components";
    import ToastContainer from "$components/toast/ToastContainer.svelte";
    import { toasts } from "path/to/toasts";
    
    function onclick() {
        toasts.add({
            type: "success",
            content: "I'm a toast !"
        });
    }`)}
    
<Button {onclick}>
    Add a toast
</Button>
<ToastContainer />`
};
</script>

<h1 id="toast">Toast</h1>
<p>Brief notifications of processes that have been or will be performed.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>A toast has 4 types : info (default), success, warning, and danger.</p>
<Playground code={basicUsageCode} class="flex-col">
	<Toast type="info" class="max-w-96">This feature is not implemented yet.</Toast>
	<Toast type="success" class="max-w-96">Post added successfully.</Toast>
	<Toast type="warning" class="max-w-96">You will be disconnected in 5 minutes.</Toast>
	<Toast type="danger" class="max-w-96">An unknown error occurred.</Toast>
</Playground>

<h3 id="action">Action</h3>
<p>
	To add a close button, you can simply pass an <Badge variant="secondary">onClose</Badge> function. Otherwise, you can use
	the <Badge variant="secondary">action</Badge> snippet to add a custom action.
</p>
<Playground code={actionCode} class="flex-col">
	<Toast type="warning" onClose={() => {}} class="max-w-96">Your session will expire soon.</Toast>
	<Toast type="success" class="max-w-96">
		Your post has been deleted successfully.

		{#snippet action()}
			<Button variant="text" size="small">Undo</Button>
		{/snippet}
	</Toast>
</Playground>

<h2 id="programmatic-calls">Programmatic calls</h2>
<p>
    While static toasts are useful, creating them programmatically allows you to display notifications
    in response to events or user actions dynamically.
</p>
<p>Here's a simple example implementation :</p>

<h3 id="logic">Logic</h3>
<p>
    First, we have to handle the logic. We are going to make a class that stores the list of current
    toasts, a method to add them and a timeout after 3 seconds.
</p>
<CodeBlock code={programmaticCallsCode.logic} lang="ts" showLineNumbers />

<h3 id="root-container">Root container</h3>
<p>Next, we need a root container, which will be responsible for displaying the toasts.</p>
<CodeBlock code={programmaticCallsCode.rootContainer} showLineNumbers />

<h3 id="usage">Usage</h3>
<p>Finally, we can start using our <Badge variant="secondary">toasts</Badge> object to create toasts programmatically.</p>
<Alert class="mb-4">
    In production code, you can put your toast container at the root of your application since you
    only need to define it once.
</Alert>
<Playground code={programmaticCallsCode.usage}>
    <Button onclick={() => toasts.add({ type: "success", content: "I'm a toast !" })}>
        Add a toast
    </Button>
</Playground>
