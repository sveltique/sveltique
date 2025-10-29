<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	children?: Snippet;
}

let { children }: Props = $props();
</script>

<div class="relative border border-muted rounded-2xl w-full overflow-hidden">
    <table class="w-full text-sm">
        {@render children?.()}
    </table>
</div>
