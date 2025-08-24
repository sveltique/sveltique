<script>
import { Kbd } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
import { script } from "$utils/playground";

const code = {
	short: `<div class="flex items-center gap-2.5">
    <Kbd>Esc</Kbd>
    <Kbd>Alt</Kbd>
    <Kbd>Shift</Kbd>
</div>
<div class="flex items-center gap-2.5">
    <div class="flex items-center gap-2.5">
        <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>
    </div>
    and
    <div class="flex items-center gap-2.5">
        <Kbd>Ctrl</Kbd> + <Kbd>V</Kbd>
    </div>
</div>`,
	expanded: `${script("import { Kbd } from '@sveltique/components';")}

<div class="flex items-center gap-2.5">
    <Kbd>Esc</Kbd>
    <Kbd>Alt</Kbd>
    <Kbd>Shift</Kbd>
</div>
<div class="flex items-center gap-2.5">
    <div class="flex items-center gap-2.5">
        <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>
    </div>
    and
    <div class="flex items-center gap-2.5">
        <Kbd>Ctrl</Kbd> + <Kbd>V</Kbd>
    </div>
</div>`
};
</script>

<h1 id="kbd">Kbd</h1>
<p>Denotes textual user input from a keyboard, voice input, or any other text entry device.</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground {code} class="flex-col">
	<div class="flex items-center gap-2.5">
		<Kbd>Esc</Kbd>
		<Kbd>Alt</Kbd>
		<Kbd>Shift</Kbd>
	</div>
	<div class="flex items-center gap-2.5">
		<div class="flex items-center gap-2.5">
			<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>
		</div>
		and
		<div class="flex items-center gap-2.5">
			<Kbd>Ctrl</Kbd> + <Kbd>V</Kbd>
		</div>
	</div>
</Playground>
