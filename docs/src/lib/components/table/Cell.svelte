<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	children?: Snippet;
}

let { children }: Props = $props();
</script>

<td class="px-6 py-4">
    {@render children?.()}
</td>
