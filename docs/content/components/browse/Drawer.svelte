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
import { toTitleCase } from "$utils/string";

let from = $state<DrawerProps["from"]>("right");
</script>

<h1>Drawer</h1>

<h2>Basic Usage</h2>
<p>test</p>
<Playground class="flex-col items-center">
    <Field label="Side" placement="left">
        {#snippet input()}
            <Select.Root bind:value={from}>
                {#each ["top", "right", "bottom", "left"] as side (side)}
                    <Select.Option value={side}>
                        {toTitleCase(side)}
                    </Select.Option>
                {/each}
            </Select.Root>
        {/snippet}
    </Field>
    <Drawer {from} closeOnOverlayClick backdropProps={{ z: 1000 }}>
        {#snippet trigger({ open, ref })}
            <Button bind:ref={ref.current} onclick={open}>Edit account</Button>
        {/snippet}

        {#snippet children({ labelProps, descriptionProps })}
            <div class="relative w-full flex flex-col gap-6">
                <h1 class="text-2xl font-bold" {...labelProps}>Edit account</h1>
                <p {...descriptionProps}>Makes changes to your account here. Save when you're done.</p>
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
                    <div class="relative w-full flex justify-between items-center">
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
