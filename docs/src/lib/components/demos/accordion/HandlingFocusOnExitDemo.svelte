<script lang="ts">
import CodeBlock from "$components/CodeBlock.svelte";
import { script } from "$utils/playground";

const handlingFocusOnExitCode = `${script(`import { Button, Drawer } from "@sveltique/components";`)}

<Drawer.Root>
    {#snippet trigger({ ref, open })}
        <Button bind:ref={ref.current} onclick={open}>
            Edit account
        </Button>
    {/snippet}
</Drawer.Root>`;
</script>

<CodeBlock code={handlingFocusOnExitCode} />
