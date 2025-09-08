<script module>
export const metadata = {
	description:
		"Narrows the user's focus to a particular element on the screen by adding a dimmed layer over your application."
};
</script>

<script>
import { Backdrop, Button, Field, TextArea, TextInput } from "@sveltique/components";
import { slide } from "svelte/transition";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

let showBackdrop = $state(false);
let showDrawer = $state(false);

function onsubmit() {
    showDrawer = false
}

const code = `${script(`import { Backdrop, Button } from '@sveltique/components';

    let showBackdrop = $state(false);`)}

<Button onclick={() => (showBackdrop = true)}>
    Show backdrop
</Button>

{#if showBackdrop}
    <Backdrop
        onclick={() => (showBackdrop = false)}
        z={1000}
    />
{/if}`;

const exampleDrawerCode = `${script(`import {
        Backdrop,
        Button,
        Field,
        TextArea,
        TextInput
    } from '@sveltique/components';
    import { slide } from "svelte/transition";

    let showDrawer = $state(false);`)}

<Button onclick={() => (showDrawer = true)}>
    Open Drawer
</Button>

{#if showDrawer}
    <Backdrop
        onclick={() => (showDrawer = false)}
        z={1000}
    >
        <div
            transition:slide={{ axis: "y", duration: 150 }}
            class={[
                "fixed bottom-0 left-0 w-full shadow-[0_0_4px_8px_rgba(0,0,0,0.2)] p-6 rounded-t-large",
                "dark:bg-[color-mix(in_oklch,var(--background),var(--foreground)_5%)]"
            ]}
        >
            <form
                {onsubmit}
                class="relative w-full max-w-lg mx-auto flex flex-col gap-6 sm:py-6"
            >
                <h2 class="font-bold text-2xl">
                    Bug Report
                </h2>
                <p class="text-muted-foreground">
                    Please provide a brief title and a description of the issue you encountered.
                </p>
                <Field label="Title">
                    {#snippet input({ props })}
                        <TextInput
                            placeholder="Backdrop component does not work..."
                            {...props}
                        />
                    {/snippet}
                </Field>
                <Field label="Description">
                    {#snippet input({ props })}
                        <TextArea
                            placeholder="I thought it would close when I pressed Escape..."
                            rows={4}
                            {...props}
                        />
                    {/snippet}
                </Field>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </div>
    </Backdrop>
{/if}`
</script>

<h1 id="backdrop">Backdrop</h1>
<p>
	Narrows the user's focus to a particular element on the screen by adding a dimmed layer over your
	application.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code}>
	<Button onclick={() => (showBackdrop = true)}>Show backdrop</Button>

	{#if showBackdrop}
		<Backdrop onclick={() => (showBackdrop = false)} z={1000} />
	{/if}
</Playground>

<h2 id="example">Examples</h2>

<h3 id="drawer">Drawer</h3>
<p>An example of a sliding drawer layered above a backdrop, suitable for forms or panels.</p>
<Playground code={exampleDrawerCode}>
    <Button onclick={() => (showDrawer = true)}>Open Drawer</Button>

    {#if showDrawer}
        <Backdrop onclick={() => (showDrawer = false)} z={1000}>
            <div
                transition:slide={{ axis: "y", duration: 150 }}
                class={[
                    "fixed bottom-0 left-0 w-full shadow-[0_0_4px_8px_rgba(0,0,0,0.2)] p-6 rounded-t-large",
                    "dark:bg-[color-mix(in_oklch,var(--background),var(--foreground)_5%)]"
                ]}
            >
                <form {onsubmit} class="relative w-full max-w-lg mx-auto flex flex-col gap-6 sm:py-6">
                    <h2 class="font-bold text-2xl">Bug Report</h2>
                    <p class="text-muted-foreground">
                        Please provide a brief title and a description of the issue you encountered.
                    </p>
                    <Field label="Title">
                        {#snippet input({ props })}
                            <TextInput placeholder="Backdrop component does not work..." {...props} />
                        {/snippet}
                    </Field>
                    <Field label="Description">
                        {#snippet input({ props })}
                            <TextArea
                                placeholder="I thought it would close when I pressed Escape..."
                                rows={4}
                                {...props}
                            />
                        {/snippet}
                    </Field>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </Backdrop>
    {/if}
</Playground>
