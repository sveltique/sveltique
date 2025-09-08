<script lang="ts">
interface Props {
	ref: HTMLDivElement;
	onopen: () => void;
}

let { onopen, ref }: Props = $props();
</script>

<div
    bind:this={ref}
    oncontextmenu={onopen}
    role="presentation"
    class="relative w-full max-w-3xs h-32 p-6 grid place-items-center border-2 border-dashed rounded-large border-muted"
>
    <p class="text-sm text-balance text-center text-muted-foreground">
        Right-click to open the context menu
    </p>
</div>
