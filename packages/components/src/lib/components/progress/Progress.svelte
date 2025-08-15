<script lang="ts">
	import { progress, type ProgressVariants } from './variants.js';

	interface Props extends ProgressVariants {
		value: number;
	}

	let { transition = true, value }: Props = $props();

	let { fill, track } = $derived(progress({ transition }));
</script>

<div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} class={track()}>
	<div style="transform: translateX({value}%);" class={fill()}></div>
</div>
