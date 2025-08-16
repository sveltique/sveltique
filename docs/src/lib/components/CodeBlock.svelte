<script lang="ts">
	import { CodeBlock, type CodeBlockProps } from '@sveltique/components';
	import { theme } from '$lib/contexts/theme.svelte';
	import { highlighter } from '$utils/shiki';

	type Props = Omit<CodeBlockProps, 'highlighter' | 'showLineNumbers' | 'theme'>;

	let { class: className, lang = 'svelte', ...restProps }: Props = $props();
</script>

<CodeBlock
	{highlighter}
	{lang}
	theme={theme.isDark ? 'one-dark-pro' : 'catppuccin-latte'}
	class={[className, '**:font-cascadia-code']}
	showLineNumbers
	{...restProps}
/>
