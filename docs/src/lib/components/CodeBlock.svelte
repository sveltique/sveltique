<script lang="ts">
	import { CodeBlock, type CodeBlockProps } from '@sveltique/components';
	import { theme } from '$lib/contexts/theme.svelte';
	import { highlighter } from '$utils/shiki';

	interface Props extends Omit<CodeBlockProps, 'highlighter' | 'lang' | 'theme'> {
		/** @default 'svelte' */
		lang?: CodeBlockProps['lang'];
	}

	let { class: className, lang = 'svelte', ...restProps }: Props = $props();
</script>

<CodeBlock
	{highlighter}
	{lang}
	theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
	class={[className, '**:font-cascadia-code']}
	{...restProps}
/>
