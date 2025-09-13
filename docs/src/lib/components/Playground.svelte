<script lang="ts">
import { Paper } from "@sveltique/components";
import { onMount, type Snippet } from "svelte";
import type { ClassNameValue } from "tailwind-merge";
import { cnBase } from "tailwind-variants";
import CodeBlock from "./CodeBlock.svelte";
import { getDynamicHeight } from "$utils/dynamic-height.svelte";

type Code = {
	short: string;
	expanded: string;
};

interface Props {
	children?: Snippet;
	class?: ClassNameValue;
	code?: string | Code;
}

let { children, class: className, code }: Props = $props();

let showCode = $state(false);
let playgroundRef = $state<HTMLDivElement>();

let playgroundHeight = getDynamicHeight(() => playgroundRef, {
	min: 400,
	attribute: "offsetHeight"
});

let heightStyle = $derived(
	playgroundHeight.current ? `height: ${playgroundHeight.current}px;` : ""
);
</script>

<div data-playground class="relative mb-4 flex w-full flex-col items-start gap-2.5">
	<div class="relative flex items-center gap-2.5">
		<button
			onclick={() => (showCode = false)}
			class={cnBase(
				'cursor-pointer px-2 py-2 text-sm font-bold',
				!showCode ? 'text-foreground' : 'text-muted-foreground'
			)}
		>
			Preview
		</button>
		<button
			onclick={() => (showCode = true)}
			class={cnBase(
				'cursor-pointer px-2 py-2 text-sm font-bold',
				showCode ? 'text-foreground' : 'text-muted-foreground'
			)}
		>
			Code
		</button>
	</div>
	{#if showCode}
		<!-- TODO : remove the code?.expanded support -->
		<div style={heightStyle} class="relative w-full">
            <CodeBlock
                code={typeof code === 'string' ? code : (code?.expanded ?? '')}
                showLineNumbers
                containerClass="h-full"
            />
        </div>
	{:else}
		<Paper
            bind:ref={playgroundRef}
            style={heightStyle}
            class={cnBase("flex w-full items-center justify-center gap-5 p-6", className)}
        >
            {@render children?.()}
		</Paper>
	{/if}
</div>
