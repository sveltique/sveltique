<script lang="ts">
import { onMount, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { slide } from "svelte/transition";
import {
	getProviderContext,
	type OverrideProviderContextOptions,
	resolveAnimation
} from "$lib/config/index.js";
import type { ReplaceWithTWMergeClass, WithRef } from "$lib/types.js";
import { useMutationObserver } from "$utils/use-mutation-observer.svelte.js";
import { accordionItem } from "./variants.js";

type IconSnippet = Snippet<
	[
		{
			props: {
				"aria-hidden": true;
				/** CSS to manage the size of the icon. */
				class: string;
			};
		}
	]
>;

export interface AccordionItemProps
	extends ReplaceWithTWMergeClass<HTMLAttributes<HTMLDivElement>>,
		WithRef<HTMLDivElement>,
		OverrideProviderContextOptions {
	/** The children content to render. */
	children: Snippet;
	/** The header of the item. */
	header: string | Snippet;
	/**
	 * The value of the item, used to identify its state. Generates a unique ID otherwise.
	 * @default $props.id()
	 */
	value?: string;
	/**
	 * The icon displayed for the expand control.
	 * @default —
	 */
	icon?: IconSnippet;
}

let {
	animation = undefined,
	children,
	class: className,
	header,
	icon = fallbackIcon,
	ref = $bindable(),
	value,
	...restProps
}: AccordionItemProps = $props();

const providerContext = getProviderContext();

const uid = $props.id();

let parent = $state<HTMLDivElement>();
let open = $state(false);
let headingLevel = $state<string>("");

let _animation = $derived(animation ?? providerContext.animation);
let _value = $derived(value ?? uid);

let {
	container,
	icon: iconCss,
	panel,
	header: headerCss,
	trigger
} = $derived(accordionItem({ animation: _animation, open }));

onMount(() => {
	if (!ref) return;

	parent = ref.parentElement as HTMLDivElement;
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

<div bind:this={ref} data-accordion-item class={container({ className })} {...restProps}>
	<svelte:element this={headingLevel} class="contents">
		<button
			id={uid}
			data-accordion-item-trigger
			data-value={_value}
			aria-controls="{uid}-panel"
			aria-expanded={open}
			class={trigger()}
		>
			<div class={headerCss()}>
                {#if typeof header === "string"}
                    {header}
                {:else}
                    {@render header()}
                {/if}

                {@render icon({ props: { "aria-hidden": true, class: iconCss() } })}
			</div>
		</button>
	</svelte:element>

	{#if open}
		<div
			transition:slide={{ duration: resolveAnimation(_animation, 150, 0) }}
			id="{uid}-panel"
            data-accordion-item-panel
			aria-labelledby={uid}
			class={panel()}
		>
			{@render children()}
		</div>
	{/if}
</div>

{#snippet fallbackIcon({ props }: Parameters<IconSnippet>["0"])}
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
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9l6 6l6 -6" />
    </svg>
{/snippet}
