<script lang="ts">
import { Button, Drawer, Kbd, Scrollable, Separator } from "@sveltique/components";
import IconX from "@tabler/icons-svelte/icons/x";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const withoutActionsSnippet = `${script(`import { Button, Drawer, Kbd, Scrollable, Separator } from "@sveltique/components";
    import IconX from "@tabler/icons-svelte/icons/x";`)}

<Drawer backdropProps={{ z: 1000 }} class="justify-start gap-6">
    {#snippet trigger({ open, ref })}
        <Button bind:ref={ref.current} onclick={open}>
            Keyboard shortcuts
        </Button>
    {/snippet}

    {#snippet children({ labelProps, descriptionProps, close })}
        <div class="relative flex flex-col gap-3 w-full">
            <header class="relative flex justify-between items-center w-full">
                <h2
                    class="font-bold text-xl"
                    {...labelProps}
                >
                    Keyboard shortcuts
                </h2>
                <Button
                    onclick={close}
                    variant="text"
                    shape="square"
                    aria-label="Close drawer"
                >
                    <IconX />
                </Button>
            </header>
            <p
                class="text-muted-foreground"
                {...descriptionProps}
            >
                View available commands to navigate and act faster.
            </p>
        </div>
        <Scrollable>
            <div class="space-y-6">
                <section class="flex flex-col gap-3">
                    <h2 class="font-bold text-foreground">Navigation</h2>
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between text-sm">
                            <span>Open command palette</span>
                            <div class="flex justify-end items-center gap-1.5">
                                <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Go to dashboard</span>
                            <div class="flex justify-end items-center gap-1.5">
                                <Kbd>G</Kbd> + <Kbd>D</Kbd>
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Open settings</span>
                            <div class="flex justify-end items-center gap-1.5">
                                <Kbd>G</Kbd> + <Kbd>S</Kbd>
                            </div>
                        </div>
                    </div>
                </section>
                <Separator />
                <section class="flex flex-col gap-3">
                    <h2 class="font-bold text-foreground">Editing</h2>
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between text-sm">
                            <span>Save changes</span>
                            <div class="flex justify-end items-center gap-1.5">
                                <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Undo</span>
                            <div class="flex justify-end items-center gap-1.5">
                                <Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd>
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Redo</span>
                            <div class="flex justify-end items-center gap-1.5">
                                <Kbd>Ctrl</Kbd> + <Kbd>Y</Kbd>
                            </div>
                        </div>
                    </div>
                </section>
                <Separator />
                <section class="flex flex-col gap-3">
                    <h2 class="font-bold text-foreground">General</h2>
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between text-sm">
                            <span>Toggle sidebar</span>
                            <div class="flex justify-end items-center gap-1.5">
                                <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd>
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Open help</span>
                            <Kbd>F1</Kbd>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Open shortcuts</span>
                            <Kbd>?</Kbd>
                        </div>
                    </div>
                </section>
            </div>
        </Scrollable>
    {/snippet}
</Drawer>`;
</script>

<Playground code={withoutActionsSnippet}>
	<Drawer backdropProps={{ z: 1000 }} class="justify-start gap-6">
        {#snippet trigger({ open, ref })}
            <Button bind:ref={ref.current} onclick={open}>
                Keyboard shortcuts
            </Button>
        {/snippet}

        {#snippet children({ labelProps, descriptionProps, close })}
            <div class="relative flex flex-col gap-3 w-full">
                <header class="relative flex justify-between items-center w-full">
                    <h2 class="font-bold text-xl" {...labelProps}>Keyboard shortcuts</h2>
                    <Button onclick={close} variant="text" shape="square" aria-label="Close drawer">
                        <IconX />
                    </Button>
                </header>
                <p class="text-muted-foreground" {...descriptionProps}>
                    View available commands to navigate and act faster.
                </p>
            </div>
            <Scrollable>
                <div class="space-y-6">
                    <section class="flex flex-col gap-3">
                        <h2 class="font-bold text-foreground">Navigation</h2>
                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between text-sm">
                                <span>Open command palette</span>
                                <div class="flex justify-end items-center gap-1.5">
                                    <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
                                </div>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Go to dashboard</span>
                                <div class="flex justify-end items-center gap-1.5">
                                    <Kbd>G</Kbd> + <Kbd>D</Kbd>
                                </div>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Open settings</span>
                                <div class="flex justify-end items-center gap-1.5">
                                    <Kbd>G</Kbd> + <Kbd>S</Kbd>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Separator />
                    <section class="flex flex-col gap-3">
                        <h2 class="font-bold text-foreground">Editing</h2>
                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between text-sm">
                                <span>Save changes</span>
                                <div class="flex justify-end items-center gap-1.5">
                                    <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
                                </div>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Undo</span>
                                <div class="flex justify-end items-center gap-1.5">
                                    <Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd>
                                </div>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Redo</span>
                                <div class="flex justify-end items-center gap-1.5">
                                    <Kbd>Ctrl</Kbd> + <Kbd>Y</Kbd>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Separator />
                    <section class="flex flex-col gap-3">
                        <h2 class="font-bold text-foreground">General</h2>
                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between text-sm">
                                <span>Toggle sidebar</span>
                                <div class="flex justify-end items-center gap-1.5">
                                    <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd>
                                </div>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Open help</span>
                                <Kbd>F1</Kbd>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Open shortcuts</span>
                                <Kbd>?</Kbd>
                            </div>
                        </div>
                    </section>
                </div>
            </Scrollable>
        {/snippet}
    </Drawer>
</Playground>
