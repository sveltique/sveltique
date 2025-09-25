<script lang="ts">
import { Button, Drawer, Field, Label, TextInput } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const basicUsageCode = `${script(`import { Button, Drawer, Field, Label, TextInput } from "@sveltique/components";`)}

<Drawer backdropProps={{ z: 1000 }} class="gap-6">
    {#snippet trigger({ open, ref })}
        <Button bind:ref={ref.current} onclick={open}>
            Edit account
        </Button>
    {/snippet}

    {#snippet children({ labelProps, descriptionProps })}
        <div class="relative flex flex-col gap-6 w-full">
            <h1 class="font-bold text-2xl" {...labelProps}>
                Edit account
            </h1>
            <p class="text-muted-foreground" {...descriptionProps}>
                Makes changes to your account here. Save when you're done.
            </p>
            <form class="relative flex flex-col gap-6">
                <Field label="Full Name">
                    {#snippet input({ props })}
                        <TextInput value="John Smith" {...props} />
                    {/snippet}
                </Field>
                <Field label="Username">
                    {#snippet input({ props })}
                        <TextInput value="@johnsmith" {...props} />
                    {/snippet}
                </Field>
                <Field label="Email">
                    {#snippet input({ props })}
                        <TextInput value="john.smith@sveltique.dev" {...props} />
                    {/snippet}
                </Field>
                <div class="relative flex justify-between items-center w-full">
                    <Label for="password">Password</Label>
                    <Button id="password">Edit password</Button>
                </div>
            </form>
        </div>
    {/snippet}

    {#snippet actions({ close })}
        <Button onclick={close}>Save</Button>
        <Button onclick={close} variant="text">
            Close
        </Button>
    {/snippet}
</Drawer>`;
</script>

<Playground code={basicUsageCode} class="flex-col items-center">
    <Drawer backdropProps={{ z: 1000 }} class="gap-6">
        {#snippet trigger({ open, ref })}
            <Button bind:ref={ref.current} onclick={open}>Edit account</Button>
        {/snippet}

        {#snippet children({ labelProps, descriptionProps })}
            <div class="relative flex flex-col gap-6 w-full">
                <h1 class="font-bold text-2xl" {...labelProps}>Edit account</h1>
                <p class="text-muted-foreground" {...descriptionProps}>
                    Makes changes to your account here. Save when you're done.
                </p>
                <form class="relative flex flex-col gap-6">
                    <Field label="Full Name">
                        {#snippet input({ props })}
                            <TextInput value="John Smith" {...props} />
                        {/snippet}
                    </Field>
                    <Field label="Username">
                        {#snippet input({ props })}
                            <TextInput value="@johnsmith" {...props} />
                        {/snippet}
                    </Field>
                    <Field label="Email">
                        {#snippet input({ props })}
                            <TextInput value="john.smith@sveltique.dev" {...props} />
                        {/snippet}
                    </Field>
                    <div class="relative flex justify-between items-center w-full">
                        <Label for="password">Password</Label>
                        <Button id="password">Edit password</Button>
                    </div>
                </form>
            </div>
        {/snippet}

        {#snippet actions({ close })}
            <Button onclick={close}>Save</Button>
            <Button onclick={close} variant="text">
                Close
            </Button>
        {/snippet}
    </Drawer>
</Playground>
