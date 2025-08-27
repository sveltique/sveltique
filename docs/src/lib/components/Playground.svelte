<script lang="ts">
import { Paper, Separator } from "@sveltique/components";
import type { Snippet } from "svelte";
import type { ClassNameValue } from "tailwind-merge";
import { cnBase } from "tailwind-variants";
import { cn } from "$utils/cn.js";
import CodeBlock from "./CodeBlock.svelte";

type Code = {
	short: string;
	expanded: string;
};

interface Props {
	children?: Snippet;
	controls?: Snippet;
	class?: ClassNameValue;
	code?: string | Code;
}

let { children, controls, class: className, code }: Props = $props();

let showCode = $state(false);
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
		<CodeBlock
			code={typeof code === 'string' ? code : (code?.expanded ?? '')}
			showLineNumbers
			class="h-[400px]"
		/>
	{:else}
		<Paper
			variant="outline"
			elevation={0}
			class="flex h-[400px] w-full flex-col items-stretch justify-between overflow-auto"
		>
			<div class={cn('relative flex grow items-center justify-center gap-5 p-6', className)}>
				{@render children?.()}
			</div>
			{#if controls}
				<Separator orientation="vertical" />
				<div class="relative p-6">
					{@render controls()}
				</div>
			{/if}
		</Paper>
	{/if}
</div>
