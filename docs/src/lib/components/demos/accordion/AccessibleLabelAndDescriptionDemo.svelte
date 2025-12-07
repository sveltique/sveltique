<script lang="ts">
import CodeBlock from "$components/CodeBlock.svelte";
import { script } from "$utils/playground";

const accessibleLabelAndDescriptionCode = `${script(`import { Drawer } from "@sveltique/components";`)}

<Drawer.Root>
    {#snippet children({ labelProps, descriptionProps })}
        <h2 {...labelProps}>Email preferences</h2>
        <p {...descriptionProps}>
            Choose which types of emails you want to receive. You can update these anytime.
        </p>
    {/snippet}
</Drawer.Root>`;
</script>

<CodeBlock code={accessibleLabelAndDescriptionCode} />
