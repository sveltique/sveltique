<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	children?: Snippet;
}

let { children }: Props = $props();
</script>

<div data-otp-group class="relative flex justify-center items-center">
    {@render children?.()}
</div>
