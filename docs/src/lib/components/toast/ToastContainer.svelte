<svelte:options runes={true} />

<script lang="ts">
import { Toast } from "@sveltique/components";
import { flip } from "svelte/animate";
import { fly } from "svelte/transition";
import { toasts } from "$lib/contexts/toast.svelte";
</script>

<div
    role="status"
	aria-live="polite"
	class="fixed right-6 bottom-6 z-[1000] flex w-[calc(100%-3rem)] sm:max-w-xs flex-col justify-center gap-2"
>
	{#each toasts.current as { id, type, content } (id)}
		<div animate:flip={{ duration: 150 }} transition:fly={{ x: 50, duration: 200 }}>
            <Toast {type}>
                {content}
            </Toast>
        </div>
	{/each}
</div>
