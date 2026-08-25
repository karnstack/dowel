import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import {
  addDays,
  addMonths,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";
import type { Day } from "date-fns";

import { Button } from "../button";
import { Popover } from "../popover";
import * as styles from "./calendar.stylex";

export interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  min?: Date;
  max?: Date;
  isDateDisabled?: (date: Date) => boolean;
  locale?: string;
  weekStartsOn?: Day;
  ariaLabel?: string;
}
function sx(...v: stylex.StyleXStyles[]) {
  const r = stylex.props(...v);
  return { className: r.className, style: r.style };
}
function formatter(
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(locale, options);
}

export function Calendar({
  value,
  defaultValue,
  onValueChange,
  month,
  defaultMonth,
  onMonthChange,
  min,
  max,
  isDateDisabled,
  locale,
  weekStartsOn = 0,
  ariaLabel = "Choose date",
}: CalendarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalMonth, setInternalMonth] = useState(() =>
    startOfMonth(defaultMonth ?? value ?? defaultValue ?? new Date()),
  );
  const selected = value ?? internalValue;
  const shownMonth = startOfMonth(month ?? internalMonth);
  const gridStart = startOfWeek(startOfMonth(shownMonth), { weekStartsOn });
  const days = useMemo(
    () => Array.from({ length: 42 }, (_, index) => addDays(gridStart, index)),
    [gridStart.getTime()],
  );
  const monthLabel = formatter(locale, {
    month: "long",
    year: "numeric",
  }).format(shownMonth);
  const dayLabel = formatter(locale, { dateStyle: "full" });
  const weekdayLabel = formatter(locale, { weekday: "narrow" });
  function move(amount: number) {
    const next = startOfMonth(addMonths(shownMonth, amount));
    if (month === undefined) setInternalMonth(next);
    onMonthChange?.(next);
  }
  function choose(date: Date) {
    const next = startOfDay(date);
    if (value === undefined) setInternalValue(next);
    if (!isSameMonth(next, shownMonth)) {
      if (month === undefined) setInternalMonth(startOfMonth(next));
      onMonthChange?.(startOfMonth(next));
    }
    onValueChange?.(next);
  }
  function disabled(date: Date) {
    const day = startOfDay(date);
    return Boolean(
      (min && isBefore(day, startOfDay(min))) ||
        (max && isAfter(day, startOfDay(max))) ||
        isDateDisabled?.(day),
    );
  }
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      {...sx(styles.calendar.root)}
      data-dowel-component="calendar"
    >
      <div {...sx(styles.calendar.header)}>
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => move(-1)}
          {...sx(styles.calendar.nav)}
        >
          <ChevronLeftIcon width={14} height={14} />
        </button>
        <span aria-live="polite" {...sx(styles.calendar.month)}>
          {monthLabel}
        </span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => move(1)}
          {...sx(styles.calendar.nav)}
        >
          <ChevronRightIcon width={14} height={14} />
        </button>
      </div>
      <div role="grid" aria-label={monthLabel} {...sx(styles.calendar.grid)}>
        {Array.from({ length: 7 }, (_, index) => {
          const date = addDays(gridStart, index);
          return (
            <span
              key={`weekday-${index}`}
              role="columnheader"
              aria-label={formatter(locale, { weekday: "long" }).format(date)}
              {...sx(styles.calendar.weekday)}
            >
              {weekdayLabel.format(date)}
            </span>
          );
        })}
        {days.map((date) => {
          const outside = !isSameMonth(date, shownMonth);
          const active = selected ? isSameDay(date, selected) : false;
          const today = isSameDay(date, new Date());
          return (
            <button
              key={date.toISOString()}
              type="button"
              role="gridcell"
              aria-label={dayLabel.format(date)}
              aria-selected={active}
              aria-current={today ? "date" : undefined}
              disabled={disabled(date)}
              onClick={() => choose(date)}
              {...sx(
                styles.calendar.day,
                outside && styles.calendar.outside,
                active && styles.calendar.selected,
                today && styles.calendar.today,
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface DatePickerProps extends Omit<CalendarProps, "ariaLabel"> {
  label: string;
  placeholder?: string;
}
export function DatePicker({
  label,
  placeholder = "Choose date",
  value,
  defaultValue,
  onValueChange,
  locale,
  ...calendarProps
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = value ?? internalValue;
  const display = selected
    ? formatter(locale, { dateStyle: "medium" }).format(selected)
    : placeholder;
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={
          <Button aria-label={label}>
            <CalendarDaysIcon width={14} height={14} aria-hidden="true" />
            {display}
          </Button>
        }
      />
      <Popover.Portal>
        <Popover.Positioner align="start">
          <Popover.Popup>
            <Calendar
              {...calendarProps}
              value={selected}
              locale={locale}
              ariaLabel={label}
              onValueChange={(date) => {
                if (value === undefined) setInternalValue(date);
                onValueChange?.(date);
                setOpen(false);
              }}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
