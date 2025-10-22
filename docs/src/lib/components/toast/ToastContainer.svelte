<svelte:options runes={true} />

<script lang="ts">
import { Toast } from "@sveltique/components";
import { motionSafe } from "@sveltique/components/utils";
import { flip } from "svelte/animate";
import { fly } from "svelte/transition";
import { toasts } from "$lib/contexts/toast.svelte";
</script>

<div
    role="status"
	aria-live="polite"
	class="right-6 bottom-6 z-[1000] fixed flex flex-col justify-center gap-2 w-[calc(100%-3rem)] sm:max-w-xs"
>
	{#each toasts.current as { id, type, content } (id)}
		<div
            animate:flip={{ duration: motionSafe(0, 150) }}
            transition:fly={{ x: 50, duration: motionSafe(0, 200) }}
        >
            <Toast {type}>
                {content}
            </Toast>
        </div>
	{/each}
</div>
