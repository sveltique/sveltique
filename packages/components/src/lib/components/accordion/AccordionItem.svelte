<script lang="ts">
import { type Component, type ComponentType, onMount, type Snippet } from "svelte";
import { slide } from "svelte/transition";
import type { TWMergeClass } from "$lib/types.js";
import { useMutationObserver } from "$utils/use-mutation-observer.svelte.js";
import { accordionItem } from "./variants.js";

type IconSnippet = Snippet<
	[
		{
			/** CSS to manage the size of the icon. */
			css: string;
		}
	]
>;

interface Props extends TWMergeClass {
	children: Snippet;
	header: Snippet;
	value?: string;
	icon?: IconSnippet;
}

let { children, class: className, header, value, icon = fallbackIcon }: Props = $props();

const uid = $props.id();

let ref = $state<HTMLDivElement>();
let parent = $state<HTMLDivElement>();

let open = $state(false);
let headingLevel = $state<string>()!;

let _value = $derived(value ?? uid);

let {
	container,
	icon: iconCss,
	iconContainer,
	panel,
	header: headerCss,
	trigger
} = $derived(accordionItem({ open }));

onMount(() => {
	parent = ref?.parentElement as HTMLDivElement;
	headingLevel = parent.getAttribute("data-heading-level")!;
	updateOpen();
});

useMutationObserver(() => parent, updateOpen, {
	attributes: true,
	attributeFilter: ["data-open-values"]
});

function updateOpen() {
	if (!parent) return;

	const openValues = parent.getAttribute("data-open-values")!.split(",");
	open = openValues.includes(_value);
}
</script>

<div bind:this={ref} class={container({ className })}>
	<svelte:element this={headingLevel} class="contents">
		<button
			id={uid}
			data-accordion-item
			data-value={_value}
			aria-controls="{uid}-panel"
			aria-expanded={open}
			class={trigger()}
		>
			<div class={headerCss()}>
				<span>{@render header()}</span>
                <div class={iconContainer()}>
				    {@render icon({ css: iconCss() })}
                </div>
			</div>
		</button>
	</svelte:element>

	{#if open}
		<div
			transition:slide={{ duration: 150 }}
			id="{uid}-panel"
			aria-labelledby={uid}
			class={panel()}
		>
			{@render children()}
		</div>
	{/if}
</div>

{#snippet fallbackIcon({ css }: Parameters<IconSnippet>["0"])}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down {css}"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9l6 6l6 -6" />
    </svg>
{/snippet}
