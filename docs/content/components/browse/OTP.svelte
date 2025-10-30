<script lang="ts">
import { Kbd, OTP } from "@sveltique/components";
import IconPointFilled from "@tabler/icons-svelte/icons/point-filled";
import Playground from "$components/Playground.svelte";

let value = $state("");
</script>

<h1 id="otp">OTP</h1>
<p>A multi-cell input component for entering one-time passwords (OTP) or verification codes.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground class="flex-col">
    <OTP.Root bind:value length={6}>
        <OTP.Group>
            <OTP.Cell index={0} />
            <OTP.Cell index={1} />
            <OTP.Cell index={2} />
        </OTP.Group>
        <IconPointFilled aria-hidden="true" />
        <OTP.Group>
            <OTP.Cell index={3} />
            <OTP.Cell index={4} />
            <OTP.Cell index={5} />
        </OTP.Group>
    </OTP.Root>
    <p class="text-sm">Current value: {value}</p>
</Playground>

<h2 id="features">Features</h2>
<ul>
    <li>Move around with <Kbd>ArrowLeft</Kbd> and <Kbd>ArrowRight</Kbd></li>
    <li>Auto-advance when typing</li>
    <li><Kbd>Backspace</Kbd> and <Kbd>Delete</Kbd> support</li>
    <li>Paste from clipboard</li>
</ul>
