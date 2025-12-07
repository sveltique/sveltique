<script lang="ts">
import CodeBlock from "$components/CodeBlock.svelte";
import { script } from "$utils/playground";

const controlledStateCode = `${script(`import { Button, Drawer } from "@sveltique/components";

    let isOpen = $state(false);`)}
    
<Button onclick={() => (isOpen = true)}>
    Edit account
</Button>

<Drawer.Root bind:isOpen>
    <Button onclick={() => (isOpen = false)}>
        Close
    </Button>
</Drawer.Root>`;
</script>

<CodeBlock code={controlledStateCode} />
