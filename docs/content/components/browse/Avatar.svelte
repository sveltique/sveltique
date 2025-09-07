<script lang="ts">
import { Avatar } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
</script>

<h1 id="avatar">Avatar</h1>
<p>with fallback</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>very simple</p>
<Playground>
    <Avatar.Root>
        <Avatar.Image src="/images/cat.webp" alt="Cat" />
    </Avatar.Root>
</Playground>
