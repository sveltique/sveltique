<script lang="ts">
import { on } from "svelte/events";
import { SvelteDate } from "svelte/reactivity";
import { cnBase } from "tailwind-variants";
import { onKeyDown } from "$utils/on-key.svelte.js";
import { toTitleCase } from "$utils/string.js";
import Button from "../button/Button.svelte";
import Paper from "../paper/Paper.svelte";
import TextInput from "../text-input/TextInput.svelte";
import { WEEK_DAYS } from "./constants.js";

interface Props {
	id?: string;
	name?: string;
	open?: boolean;
	value?: Date;
}

let { id, name, open = $bindable(false), value = $bindable(new SvelteDate()) }: Props = $props();

let containerRef = $state<HTMLElement>();
let inputRef = $state<HTMLElement>();
let pickerRef = $state<HTMLElement>();

let viewDate = new SvelteDate(value);
let focusedDate = new SvelteDate(value);

let currentMonth = $derived.by(() => {
	return toTitleCase(viewDate.toLocaleString(navigator.language, { month: "long" }));
});

let currentYear = $derived.by(() => {
	return viewDate.toLocaleString(navigator.language, { year: "numeric" });
});

let formattedValue = $derived.by(() => {
	if (!value) return "-- / -- / ----";

	const day = value.getDate().toString().padStart(2, "0");
	const month = (value.getMonth() + 1).toString().padStart(2, "0");
	const year = value.getFullYear();

	return `${day} / ${month} / ${year}`;
});

$effect(() => {
	if (!inputRef || !pickerRef) return;

	return on(window, "click", (event) => {
		const target = event.target as Node | null;

		if (!target) return;
		if (inputRef === target || pickerRef!.contains(target)) return;

		open = false;
	});
});

$effect(() => {
	if (viewDate.getMonth() !== focusedDate.getMonth()) {
		viewDate.setMonth(focusedDate.getMonth());
	}
});

onKeyDown(["ArrowUp", "ArrowDown"], preventArrowScroll, { preventDefault: true });

onKeyDown(
	["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
	(event) => {
		if (!containerRef) return;

		/* activeElement.current && activeElement.current.blur(); */

		if (event.key === "ArrowUp") {
			focusedDate.setDate(focusedDate.getDate() - 7);
		} else if (event.key === "ArrowDown") {
			focusedDate.setDate(focusedDate.getDate() + 7);
		} else if (event.key === "ArrowRight") {
			focusedDate.setDate(focusedDate.getDate() + 1);
		} else if (event.key === "ArrowLeft") {
			focusedDate.setDate(focusedDate.getDate() - 1);
		}
	},
	{
		element: () => containerRef
	}
);

onKeyDown(["Space", "Enter"], () => (open = !open), {
	element: () => inputRef
});

onKeyDown(["Space", "Enter"], () => open && selectDate(focusedDate), {
	element: () => containerRef
});

function preventArrowScroll(event: Event) {
	if (open) {
		event.preventDefault();
	}
}

function prepareDates() {
	return [...getPreviousMonthDates(), ...getDatesInCurrentMonth(), ...getNextMonthDates()];
}

function getDatesInCurrentMonth(): Date[] {
	return getDatesInMonth(viewDate.getMonth(), viewDate.getFullYear());
}

function getDatesInMonth(month: number, year: number): Date[] {
	const date = new Date(year, month, 1);
	const days = [];

	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}

	return days;
}

function getPreviousMonthDates() {
	let dayOfWeekIndex = getDatesInCurrentMonth().at(0)!.getDay();

	if (dayOfWeekIndex === 1) {
		return [];
	} else if (dayOfWeekIndex === 0) {
		dayOfWeekIndex = 7;
	}

	const clonedDate = new Date(viewDate);
	clonedDate.setMonth(clonedDate.getMonth() - 1);

	const previousMonthDates = getDatesInMonth(clonedDate.getMonth(), clonedDate.getFullYear());

	return previousMonthDates.slice(-dayOfWeekIndex + 1);
}

function getNextMonthDates() {
	let dayOfWeekIndex = getDatesInCurrentMonth().at(-1)!.getDay();

	if (dayOfWeekIndex === 0) {
		return [];
	}

	const clonedDate = new Date(viewDate);
	clonedDate.setMonth(clonedDate.getMonth() + 1);

	const nextMonthDates = getDatesInMonth(clonedDate.getMonth(), clonedDate.getFullYear());

	return nextMonthDates.slice(0, 7 - dayOfWeekIndex);
}

function selectDate(date: Date) {
	value.setDate(date.getDate());
	value.setMonth(date.getMonth());
	value.setFullYear(date.getFullYear());

	open = false;
}

function isSameDate(date: Date, other: Date) {
	return (
		date.getFullYear() === other.getFullYear() &&
		date.getMonth() === other.getMonth() &&
		date.getDate() === other.getDate()
	);
}

/* function isToday(date: Date) {
	const today = new Date();

	return (
		today.getFullYear() === date.getFullYear() &&
		today.getMonth() === date.getMonth() &&
		today.getDate() === date.getDate()
	);
} */
</script>

<div bind:this={containerRef} class="relative">
    <input type="date" {id} {name} value={value.toUTCString()} aria-hidden="true" class="hidden" />
    <TextInput bind:ref={inputRef} onclick={() => open = !open} value={formattedValue} readonly class="cursor-pointer" />

    <Paper
        bind:ref={pickerRef}
        variant="outline"
        aria-hidden={!open}
        class={cnBase("hidden absolute top-[calc(100%+8px)] left-0 p-6 shadow-md flex-col gap-3", open && "flex")}
    >
        {@render header()}
        <div class="relative w-full grid grid-cols-7 gap-1">
            {#each WEEK_DAYS.map(d => d.slice(0, 2)) as weekDay, index (index)}
                <span class="text-sm text-muted-foreground w-9 grid place-items-center">
                    {weekDay}
                </span>
            {/each}
            {#each prepareDates() as date, index (index)}
                {@const isSameMonth = date.getMonth() === viewDate.getMonth()}
                <Button
                    onclick={() => selectDate(date)}
                    variant="text"
                    shape="square"
                    size="small"
                    tabindex={isSameDate(focusedDate, date) ? 0 : "-1"}
                    class={cnBase(
                        "w-9 aspect-square",
                        !isSameMonth && "text-muted-foreground",
                        isSameDate(focusedDate, date) && "not-hover:bg-primary-muted not-hover:text-background"
                    )}
                >
                    {date.getDate()}
                </Button>
            {/each}
        </div>
    </Paper>
</div>

{#snippet header()}
    <div class="relative w-full flex justify-between items-center gap-6">
        <div class="relative flex items-center gap-1">
            <Button
                onclick={() => viewDate.setFullYear(viewDate.getFullYear() - 1)}
                variant="text"
                shape="square"
                size="small"
            >
                {@render chevronsLeft()}
            </Button>
            <Button
                onclick={() => viewDate.setMonth(viewDate.getMonth() - 1)}
                variant="text"
                shape="square"
                size="small"
            >
                {@render chevronLeft()}
            </Button>
        </div>
        <div class="w-32 text-center">{currentMonth} {currentYear}</div>
        <div class="relative flex items-center gap-1">
            <Button
                onclick={() => viewDate.setMonth(viewDate.getMonth() + 1)}
                variant="text"
                shape="square"
                size="small"
            >
                {@render chevronRight()}
            </Button>
            <Button
                onclick={() => viewDate.setFullYear(viewDate.getFullYear() + 1)}
                variant="text"
                shape="square"
                size="small"
            >
                {@render chevronsRight()}
            </Button>
        </div>
    </div>
{/snippet}

{#snippet chevronLeft()}
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
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M15 6l-6 6l6 6" />
    </svg>
{/snippet}

{#snippet chevronsLeft()}
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
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-left"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M11 7l-5 5l5 5" />
        <path d="M17 7l-5 5l5 5" />
    </svg>
{/snippet}

{#snippet chevronRight()}
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
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 6l6 6l-6 6" />
    </svg>
{/snippet}

{#snippet chevronsRight()}
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
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 7l5 5l-5 5" />
        <path d="M13 7l5 5l-5 5" />
    </svg>
{/snippet}
