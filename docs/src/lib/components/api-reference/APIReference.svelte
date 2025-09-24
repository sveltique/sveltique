<script lang="ts">
import { Alert } from "@sveltique/components";
import type { SimplifiedGroup } from "$lib/reference/generator";
import Type from "./Type.svelte";

interface Props {
	group: SimplifiedGroup;
}

let { group }: Props = $props();
</script>

<h2 id="reference">API Reference</h2>
<Alert type="warning">
    We are currently experimenting with the API reference generation. Data may be incomplete
    for the time being.
</Alert>
{#each group.types as type}
    <Type {type} />
{/each}
