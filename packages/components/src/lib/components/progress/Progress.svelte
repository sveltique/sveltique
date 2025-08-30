<script lang="ts">
import { type ProgressVariants, progress } from "./variants.js";

interface Props extends ProgressVariants {
	value: number;
}

let { transition = true, value }: Props = $props();

let { fill, track } = $derived(progress({ transition }));
</script>

<div role="progressbar" data-progress aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} class={track()}>
	<div data-progress-fill style="transform: translateX({value}%);" class={fill()}></div>
</div>
