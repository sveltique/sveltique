<script lang="ts">
	import { tick } from 'svelte';
	import { dateInput } from './variants.js';
	import { cnBase } from 'tailwind-variants';
	import IconClock from '@tabler/icons-svelte/icons/clock';
	import { SvelteDate } from 'svelte/reactivity';
	import { Select } from '../select/index.js';
	import Modal, { type ModalProps } from '../modal/Modal.svelte';
	import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
	import IconChevronRight from '@tabler/icons-svelte/icons/chevron-right';
	import Button from '../button/Button.svelte';

	const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	const MONTHS = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	interface Props {
		value?: Date | null;
		/** @default "default" */
		locale?: string;
		min?: Date;
		max?: Date;
		/**
		 * Customize the modal component directly.
		 * @default {}
		 */
		modalProps?: Omit<ModalProps, 'children' | 'trigger' | 'actions'>;
	}

	let { max, min, value = $bindable(), modalProps = {} }: Props = $props();

	let isOpen = $state(false);
	let anchorButton: HTMLButtonElement | null = $state(null);
	let dialogEl: HTMLDivElement | null = $state(null);

	let viewDate = $state(new SvelteDate(value));
	let formattedDate = $derived.by(() => {
		if (!value) return '--/--/----';

		const day = value.getDate().toString().padStart(2, '0');
		const month = (value.getMonth() + 1).toString().padStart(2, '0');
		const year = value.getFullYear();

		return `${day}/${month}/${year}`;
	});

	const { grid, input } = $derived(dateInput());

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
		isOpen = true;
		dialogEl?.focus();
	}

	function closePicker() {
		isOpen = false;
		anchorButton?.focus();
	}

	function selectDay(day: number) {
		const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);

		if ((min && normalize(d) < normalize(min)) || (max && normalize(d) > normalize(max))) {
			return;
		}

		value = d;
	}

	function monthMatrix(d: Date) {
		const first = getMonthStart(d);
		const startWeekday = first.getDay();
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

	function isDisabledDay(day: number | null) {
		if (day === null) return true;
		const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
		if (min && normalize(d) < normalize(min)) return true;
		if (max && normalize(d) > normalize(max)) return true;
		return false;
	}

	function years() {
		const currentYear = new Date().getFullYear();

		let yearsArr = [];
		for (let i = -100; i < 10; i++) {
			yearsArr.push(currentYear + i);
		}

		return yearsArr;
	}
</script>

<Modal bind:isOpen {...modalProps}>
	{#snippet trigger()}
		<button
			bind:this={anchorButton}
			aria-haspopup="dialog"
			aria-expanded={isOpen}
			aria-label="Choose date"
			onclick={openPicker}
			class={input()}
		>
			<IconClock class="h-5 w-5 text-zinc-500" />
			<span>{formattedDate}</span>
		</button>
	{/snippet}

	<div class="flex items-center justify-between gap-2">
		<button aria-label="Previous month" onclick={() => viewDate.setMonth(viewDate.getMonth() - 1)}>
			<IconChevronLeft />
		</button>
		<Select.Root
			bind:value={() => MONTHS[viewDate.getMonth()], (v) => viewDate.setMonth(Number(v))}
		>
			{#each MONTHS as month, index (index)}
				<Select.Option value={index.toString()}>{month}</Select.Option>
			{/each}
		</Select.Root>
		<Select.Root
			bind:value={() => viewDate.getFullYear().toString(), (v) => viewDate.setFullYear(Number(v))}
		>
			{#each years() as year, index (index)}
				<Select.Option value={year.toString()}>{year}</Select.Option>
			{/each}
		</Select.Root>
		<button aria-label="Next month" onclick={() => viewDate.setMonth(viewDate.getMonth() + 1)}>
			<IconChevronRight />
		</button>
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
					tabindex={day ? 0 : -1}
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
		<Button
			onclick={() => {
				value = null;
				closePicker();
			}}
			variant="text"
			size="small"
		>
			Clear
		</Button>
		<Button onclick={closePicker} size="small">Confirm</Button>
	</div>
</Modal>
