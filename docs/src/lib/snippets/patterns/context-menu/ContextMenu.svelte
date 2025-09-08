<script lang="ts">
import { Button, Kbd, Paper, Separator } from "@sveltique/components";

interface Props {
	onclose: () => void;
	ref: HTMLDivElement;
}

let { onclose, ref = $bindable() }: Props = $props();
</script>

<Paper bind:ref class="shadow-lg">
    <div class="p-1.5">
        <Button
            onclick={onclose}
            variant="text"
            class="w-full justify-start"
        >
            Open
        </Button>
        <Button
            onclick={onclose}
            variant="text"
            class="w-full justify-start"
        >
            Rename
        </Button>
    </div>
    <Separator />
    <div class="p-1.5">
        <Button
            onclick={onclose}
            variant="text"
            class="w-full justify-start"
        >
            Delete
        </Button>
    </div>
    <Separator />
    <div class="p-1.5">
        <Button
            onclick={onclose}
            variant="text"
            class="w-full justify-start flex items-center gap-5"
        >
            Inspect <Kbd>Ctrl+Shift+I</Kbd>
        </Button>
    </div>
</Paper>
