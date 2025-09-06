<script lang="ts">
import { Kbd, OTP } from "@sveltique/components";
import Playground from "$components/Playground.svelte";

let value = $state("");
</script>

<h1 id="otp">OTP</h1>
<p>one-time-password</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground class="flex-col">
    <pre>Current value : {value}</pre>
    <OTP bind:value />
</Playground>

<h2 id="features">Features</h2>
<ul>
    <li>Move around with <Kbd>ArrowLeft</Kbd> and <Kbd>ArrowRight</Kbd></li>
    <li>Paste from clipboard</li>
</ul>
