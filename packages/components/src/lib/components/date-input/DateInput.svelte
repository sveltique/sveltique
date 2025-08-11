<script lang="ts">
	import { tick } from 'svelte';
	import { dateInput } from './variants.js';
	import { cnBase } from 'tailwind-variants';

	const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	interface Props {
		value?: Date | null;
		/** @default "default" */
		locale?: string;
		/** @default true */
		closeOnSelect?: boolean;
		min?: Date;
		max?: Date;
		/** @default "Select date" */
		placeholder?: string;
	}

	let {
		closeOnSelect = true,
		locale = 'default',
		max,
		min,
		placeholder = 'Select date',
		value = $bindable()
	}: Props = $props();

	let open = $state(false);
	let anchorButton: HTMLButtonElement | null = $state(null);
	let dialogEl: HTMLDivElement | null = $state(null);

	// internal view state
	let viewDate = $derived(value ? new Date(value) : new Date()); // current shown month/year
	// focused cell for keyboard navigation (day number or null)
	let focusedDay: number | null = $state(null);

	const { grid, input, overlay, panel } = $derived(dateInput());

	/** Truncate time from date to compare only Y-M-D. */
	const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

	function isSameDay(a?: Date | null, b?: Date | null) {
		if (!a || !b) return false;
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	function getMonthStart(date: Date) {
		return new Date(date.getFullYear(), date.getMonth(), 1);
	}
	function getMonthEnd(date: Date) {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0);
	}

	function getDaysInMonth(date: Date) {
		return getMonthEnd(date).getDate();
	}

	function openPicker() {
		viewDate = value ? new Date(value) : new Date();
		open = true;
		// set focused day to selected day (or 1)
		focusedDay = value && value.getMonth() === viewDate.getMonth() ? value.getDate() : 1;
		tick().then(() => {
			dialogEl?.focus();
		});
	}

	function closePicker() {
		open = false;
		focusedDay = null;
		// return focus to trigger
		anchorButton?.focus();
	}

	function prevMonth() {
		viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
		focusedDay = 1;
	}
	function nextMonth() {
		viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
		focusedDay = 1;
	}
	function setYear(delta: number) {
		viewDate = new Date(viewDate.getFullYear() + delta, viewDate.getMonth(), 1);
		focusedDay = 1;
	}

	function selectDay(day: number) {
		const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
		// enforce min/max
		if ((min && normalize(d) < normalize(min)) || (max && normalize(d) > normalize(max))) {
			return;
		}

		value = d;
		if (closeOnSelect) closePicker();
	}

	// keyboard handling inside the dialog
	function onKeyDownDialog(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			closePicker();
			return;
		}

		if (!focusedDay) return;

		const dni = getDaysInMonth(viewDate);
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			focusedDay = focusedDay === 1 ? dni : focusedDay - 1;
			ensureMonthForFocusedDay();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			focusedDay = focusedDay === dni ? 1 : focusedDay + 1;
			ensureMonthForFocusedDay();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			focusedDay = Math.max(1, focusedDay - 7);
			ensureMonthForFocusedDay();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			focusedDay = Math.min(dni, focusedDay + 7);
			ensureMonthForFocusedDay();
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			selectDay(focusedDay);
		} else if (e.key === 'PageUp') {
			e.preventDefault();
			prevMonth();
		} else if (e.key === 'PageDown') {
			e.preventDefault();
			nextMonth();
		}
	}

	function ensureMonthForFocusedDay() {
		// if focusedDay moved outside current days (shouldn't here),
		// but keep it safe - clamp
		const dni = getDaysInMonth(viewDate);
		if (focusedDay! > dni) focusedDay = dni;
	}

	// generate calendar matrix for the viewDate month
	function monthMatrix(d: Date) {
		const first = getMonthStart(d);
		const startWeekday = first.getDay(); // 0..6 (Sun..Sat)
		const dni = getDaysInMonth(d);
		const rows = [];
		let current = 1 - startWeekday; // may be negative -> days from previous month as blanks
		while (current <= dni) {
			const week: (number | null)[] = [];
			for (let i = 0; i < 7; i++) {
				if (current < 1 || current > dni) week.push(null);
				else week.push(current);
				current++;
			}
			rows.push(week);
		}
		return rows;
	}

	// formatting
	function formatValue(d: Date | null) {
		if (!d) return '';
		return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
	}

	// click outside to close (overlay)
	function onOverlayClick(e: MouseEvent) {
		// close only if clicked the overlay (not children)
		if (e.target === e.currentTarget) closePicker();
	}

	// helper for disabling days by min/max
	function isDisabledDay(day: number | null) {
		if (day === null) return true;
		const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
		if (min && normalize(d) < normalize(min)) return true;
		if (max && normalize(d) > normalize(max)) return true;
		return false;
	}
</script>

<!-- Trigger / input -->
<button
	bind:this={anchorButton}
	aria-haspopup="dialog"
	aria-expanded={open}
	aria-label="Choose date"
	onclick={openPicker}
	class={input()}
>
	<span>{value ? formatValue(value) : placeholder}</span>
	<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"
		><path fill="currentColor" d="M7 10l5 5 5-5z" /></svg
	>
</button>

{#if open}
	<div class={overlay()} role="presentation" onclick={onOverlayClick}>
		<div
			bind:this={dialogEl}
			role="dialog"
			aria-modal="true"
			aria-label="Date picker"
			tabindex="0"
			onkeydown={onKeyDownDialog}
			class={panel()}
		>
			<div class="flex items-center justify-between gap-2">
				<div>
					<div class="font-bold">
						{viewDate.toLocaleString(locale, { month: 'long' })}
						{viewDate.getFullYear()}
					</div>
					<div class="color-[#6b7280] text-sm">
						{viewDate.toLocaleDateString(locale, { weekday: 'long' })}
					</div>
				</div>

				<div class="flex items-center gap-1">
					<button aria-label="Previous year" onclick={() => setYear(-1)}>&lt;&lt;</button>
					<button aria-label="Previous month" onclick={prevMonth}>&lt;</button>
					<button aria-label="Next month" onclick={nextMonth}>&gt;</button>
					<button aria-label="Next year" onclick={() => setYear(1)}>&gt;&gt;</button>
				</div>
			</div>

			<!-- day headings -->
			<div class={grid({ className: 'mt-3' })} aria-hidden="true">
				{#each DAYS as d}
					<div class="text-center text-xs text-[#6b7280]">{d}</div>
				{/each}
			</div>

			<!-- day cells -->
			<div class={grid()} role="grid" aria-label="Calendar">
				{#each monthMatrix(viewDate) as week}
					{#each week as day}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div
							role="gridcell"
							tabindex={day && focusedDay === day ? 0 : -1}
							class={cnBase(
								'cursor-pointer select-none rounded-[6px] px-[0.35rem] py-[0.4rem] text-center',
								'focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2',
								isSameDay(value, new Date(viewDate.getFullYear(), viewDate.getMonth(), day || 0)) &&
									'bg-blue-700 text-white',
								isSameDay(
									new Date(),
									new Date(viewDate.getFullYear(), viewDate.getMonth(), day || 0)
								) && 'shadow-[inset_0_0_0_1px_#c7d2fe]',
								isDisabledDay(day) && 'cursor-not-allowed opacity-35'
							)}
							onclick={() => day && !isDisabledDay(day) && selectDay(day)}
							onfocus={() => (focusedDay = day)}
							aria-disabled={isDisabledDay(day)}
							aria-selected={isSameDay(
								value,
								new Date(viewDate.getFullYear(), viewDate.getMonth(), day || 0)
							)}
						>
							{#if day}
								<span>{day}</span>
							{/if}
						</div>
					{/each}
				{/each}
			</div>

			<div class="mt-2 flex justify-end gap-2">
				<button
					onclick={() => {
						value = null;
						closePicker();
					}}>Clear</button
				>
				<button onclick={closePicker}>Close</button>
			</div>
		</div>
	</div>
{/if}
