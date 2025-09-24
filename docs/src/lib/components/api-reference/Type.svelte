<script lang="ts">
import { Badge, Button, Modal, Separator } from "@sveltique/components";
import IconInfoCircleFilled from "@tabler/icons-svelte/icons/info-circle-filled";
import { cnBase } from "tailwind-variants";
import CodeBlock from "$components/CodeBlock.svelte";
import type { SimplifiedType } from "$lib/reference/generator";
import { slugify } from "$utils/string";

interface Props {
	type: SimplifiedType;
}

let { type: docType }: Props = $props();

let { name, properties } = $derived(docType);
</script>

<h3 id={slugify(name)}>{name}</h3>

<div class="relative w-full flex sm:hidden flex-col divide-y divide-muted text-sm">
    <div class="relative w-full py-2 text-muted-foreground font-semibold">
        Property
    </div>
    {#each properties as { comment, defaultValue, deprecated, name, bindable, optional, type }}
        <div class="relative w-full py-2 flex justify-between items-center">
            <div class="pr-6 flex gap-3">
                <Badge
                    variant="secondary"
                    class={cnBase(deprecated && "line-through")}
                >
                    {name}
                </Badge>

                {#if deprecated}
                    <Badge class="bg-warning">deprecated</Badge>
                {/if}

                {#if !optional}
                    <Badge variant="danger">required</Badge>
                {/if}

                {#if bindable}
                    <Badge>$bindable</Badge>
                {/if}
            </div>
            <Modal closeOnOverlayClick class="gap-3">
                {#snippet trigger({ open })}
                    <Button onclick={open} variant="text" shape="square" size="small">
                        <IconInfoCircleFilled class="size-4" />
                    </Button>
                {/snippet}

                <h4 class="flex items-center gap-3">
                    <Badge
                        variant="secondary"
                        class={cnBase("text-base", deprecated && "line-through")}
                    >
                        {name}
                    </Badge>

                    {#if deprecated}
                        <Badge class="bg-warning">deprecated</Badge>
                    {/if}

                    {#if !optional}
                        <Badge variant="danger">required</Badge>
                    {/if}

                    {#if name === "ref"}
                        <Badge>$bindable</Badge>
                    {/if}
                </h4>
                <Separator />
                <h5 class="text-base font-semibold">Type</h5>
                <CodeBlock code={type} lang="ts" />
                <Separator />
                <h5 class="text-base font-semibold">Description</h5>
                {#if comment}
                    <p>{comment}</p>
                {:else}
                    <p class="italic text-muted-foreground">None</p>
                {/if}

                {#if deprecated}
                    <p class="text-muted-foreground font-medium">Deprecated : {deprecated}</p>
                {/if}

                {#if defaultValue}
                    <p class="text-muted-foreground font-medium">
                        Default : <Badge variant="secondary">{defaultValue}</Badge>
                    </p>
                {/if}
            </Modal>
        </div>
    {/each}
</div>

<div class="hidden relative w-full sm:flex flex-col divide-y divide-muted text-sm">
    <div class="relative w-full py-2 flex justify-between items-center text-muted-foreground font-semibold">
        <div class="w-[30%] pr-6">Property</div>
        <div class="w-[30%] pr-6">Type</div>
        <div class="w-2/5">Description</div>
    </div>
    {#each properties as { comment, defaultValue, deprecated, name, bindable, optional, type }}
        <div class="relative w-full py-2 flex justify-between items-center">
            <div class="w-[30%] pr-6 flex gap-3">
                <Badge
                    variant="secondary"
                    class={cnBase(deprecated && "line-through")}
                >
                    {name}
                </Badge>

                {#if deprecated}
                    <Badge class="bg-warning">deprecated</Badge>
                {/if}

                {#if !optional}
                    <Badge variant="danger">required</Badge>
                {/if}

                {#if bindable}
                    <Badge>$bindable</Badge>
                {/if}
            </div>
            <div class="w-[30%] pr-6 wrap-anywhere">{type}</div>
            <div class="w-2/5 flex flex-col gap-3">
                {#if comment}
                    <p>{comment}</p>
                {:else}
                    <p class="italic text-muted-foreground">None</p>
                {/if}

                {#if deprecated}
                    <p class="text-muted-foreground font-medium">Deprecated : {deprecated}</p>
                {/if}

                {#if defaultValue}
                    <p class="text-muted-foreground font-medium">
                        Default : <Badge variant="secondary">{defaultValue}</Badge>
                    </p>
                {/if}
            </div>
        </div>
    {/each}
</div>
