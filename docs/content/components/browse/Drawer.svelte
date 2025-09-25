<script lang="ts">
import { Button, Drawer } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
</script>

<h1>Drawer</h1>

<h2>Basic Usage</h2>
<p>test</p>
<Playground>
    <Drawer backdropProps={{ z: 1000 }}>
        {#snippet trigger({ open, ref })}
            <Button bind:ref={ref.current} onclick={open}>Edit account</Button>
        {/snippet}

        test
    </Drawer>
</Playground>
