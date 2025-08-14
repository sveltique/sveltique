<script>
	import Playground from '$components/Playground.svelte';
	import { script } from '$utils/playground';
	import { Kbd } from '@sveltique/components';

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

<h1>Kbd</h1>
<p>Denotes textual user input from a keyboard, voice input, or any other text entry device.</p>
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
