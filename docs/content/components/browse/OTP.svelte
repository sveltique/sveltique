<script lang="ts">
import { Kbd, OTP } from "@sveltique/components";
import Playground from "$components/Playground.svelte";

let value = $state("");
</script>

<h1>OTP</h1>
<p>one-time-password</p>

<h2>Basic Usage</h2>
<Playground class="flex-col">
    <p>Current value : {value}</p>
    <OTP bind:value />
</Playground>

<h2>Features</h2>
<ul>
    <li>Move around with <Kbd>ArrowLeft</Kbd> and <Kbd>ArrowRight</Kbd></li>
    <li>Paste from clipboard</li>
</ul>
