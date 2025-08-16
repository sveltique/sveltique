<script lang="ts">
	import { textArea } from './variants.js';
	import type { WithRef, ReplaceWithTWMergeClass } from '$lib/types.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props
		extends ReplaceWithTWMergeClass<Omit<HTMLTextareaAttributes, 'value'>>,
			WithRef<HTMLTextAreaElement> {
		value?: string;
	}

	let { class: className, ref = $bindable(), value = $bindable(), ...restProps }: Props = $props();
</script>

<textarea bind:value class={textArea({ className })} {...restProps}></textarea>
