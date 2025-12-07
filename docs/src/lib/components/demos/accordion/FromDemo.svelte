<script lang="ts">
import {
	Button,
	Drawer,
	type DrawerProps,
	Field,
	Label,
	Select,
	TextInput
} from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";
import { toTitleCase } from "$utils/string";

const SIDES = ["top", "right", "bottom", "left"] satisfies DrawerProps["from"][];
let from = $state<DrawerProps["from"]>("right");

const fromCode = `${script(`import { Button, Drawer, Field, Label, Select, TextInput } from "@sveltique/components";

    const SIDES = ["top", "right", "bottom", "left"] satisfies DrawerProps["from"][];
    let from = $state<Drawer.RootProps["from"]>("right");
    
    function toTitleCase(str: string) {
        return str.at(0)!.toUpperCase() + str.slice(1).toLowerCase();
    }`)}

<div class="relative flex justify-center items-center">
    <Field label="Side" placement="left">
        {#snippet input({ props })}
            <Select.Root
                bind:value={from}
                containerProps={{ class: "w-32" }}
                {...props}
            >
                {#each SIDES as side (side)}
                    <Select.Option value={side}>
                        {toTitleCase(side)}
                    </Select.Option>
                {/each}
            </Select.Root>
        {/snippet}
    </Field>
</div>

<Drawer.Root {from} backdropProps={{ z: 1000 }}>
    {#snippet trigger({ open, ref })}
        <Button bind:ref={ref.current} onclick={open}>
            Edit account
        </Button>
    {/snippet}

    {#snippet children({ close, labelProps, descriptionProps })}
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
        <div class="relative flex flex-col gap-3 w-full">
            <Button onclick={close}>Save</Button>
            <Button onclick={close} variant="text">
                Close
            </Button>
        </div>
    {/snippet}
</Drawer.Root>`;
</script>

<Playground code={fromCode} class="flex-col justify-center">
    <div class="relative flex justify-center items-center">
        <Field label="Side" placement="left">
            {#snippet input({ props })}
                <Select.Root bind:value={from} containerProps={{ class: "w-32" }} {...props}>
                    {#each SIDES as side (side)}
                        <Select.Option value={side}>
                            {toTitleCase(side)}
                        </Select.Option>
                    {/each}
                </Select.Root>
            {/snippet}
        </Field>
    </div>
    
    <Drawer.Root {from} backdropProps={{ z: 1000 }}>
        {#snippet trigger({ open, ref })}
            <Button bind:ref={ref.current} onclick={open}>Edit account</Button>
        {/snippet}

        {#snippet children({ close, labelProps, descriptionProps })}
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
            <div class="relative flex flex-col gap-3 w-full">
                <Button onclick={close}>Save</Button>
                <Button onclick={close} variant="text">
                    Close
                </Button>
            </div>
        {/snippet}
    </Drawer.Root>
</Playground>
