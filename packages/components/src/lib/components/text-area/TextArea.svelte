<script lang="ts">
	import type { WithRef, WithTWMergeClass } from '$lib/types.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { textArea } from './variants.js';

	interface Props
		extends WithTWMergeClass<Omit<HTMLTextareaAttributes, 'value'>>,
			WithRef<HTMLTextAreaElement> {
		value?: string;
	}

	let { class: className, ref = $bindable(), value = $bindable(), ...restProps }: Props = $props();
</script>

<textarea bind:value class={textArea({ className })} {...restProps}></textarea>
