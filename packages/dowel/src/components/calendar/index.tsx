import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import { CalendarDate } from "@internationalized/date";
import * as stylex from "@stylexjs/stylex";
import {
  Button as AriaButton,
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  CalendarHeading as AriaCalendarHeading,
  DateInput as AriaDateInput,
  DatePicker as AriaDatePicker,
  DateSegment as AriaDateSegment,
  Dialog as AriaDialog,
  Group as AriaGroup,
  I18nProvider,
  Label as AriaLabel,
  Popover as AriaPopover,
} from "react-aria-components";
import type {
  CalendarCellRenderProps,
  CalendarProps as AriaCalendarProps,
  DatePickerProps as AriaDatePickerProps,
  GroupRenderProps,
} from "react-aria-components";
import { useState } from "react";
import type { ReactNode } from "react";

import * as styles from "./calendar.stylex";

function sx(...values: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...values);
  return { className: resolved.className, style: resolved.style };
}

function calendarCellClassName({
  isDisabled,
  isFocusVisible,
  isOutsideMonth,
  isSelected,
  isToday,
  isUnavailable,
}: CalendarCellRenderProps) {
  return (
    sx(
      styles.calendar.day,
      isOutsideMonth && styles.calendar.outside,
      isSelected && styles.calendar.selected,
      isToday && styles.calendar.today,
      isToday && isSelected && styles.calendar.todaySelected,
      isFocusVisible && styles.calendar.dayFocused,
      isDisabled && styles.calendar.disabled,
      isUnavailable && styles.calendar.unavailable,
    ).className ?? ""
  );
}

function CalendarContents() {
  return (
    <>
      <header {...sx(styles.calendar.header)}>
        <AriaButton
          slot="previous"
          aria-label="Previous month"
          {...sx(styles.calendar.nav)}
        >
          <ChevronLeftIcon width={14} height={14} aria-hidden="true" />
        </AriaButton>
        <AriaCalendarHeading {...sx(styles.calendar.month)} />
        <AriaButton
          slot="next"
          aria-label="Next month"
          {...sx(styles.calendar.nav)}
        >
          <ChevronRightIcon width={14} height={14} aria-hidden="true" />
        </AriaButton>
      </header>
      <AriaCalendarGrid weekdayStyle="narrow" {...sx(styles.calendar.grid)}>
        <AriaCalendarGridHeader>
          {(day) => (
            <AriaCalendarHeaderCell {...sx(styles.calendar.weekday)}>
              {day}
            </AriaCalendarHeaderCell>
          )}
        </AriaCalendarGridHeader>
        <AriaCalendarGridBody>
          {(date) => (
            <AriaCalendarCell date={date} className={calendarCellClassName} />
          )}
        </AriaCalendarGridBody>
      </AriaCalendarGrid>
    </>
  );
}

export interface CalendarProps
  extends Omit<
    AriaCalendarProps<CalendarDate>,
    "aria-label" | "children" | "className" | "onChange" | "style"
  > {
  ariaLabel?: string;
  locale?: string;
  onValueChange?: (date: CalendarDate) => void;
}

function CalendarRoot({
  ariaLabel = "Choose date",
  onValueChange,
  ...props
}: Omit<CalendarProps, "locale">) {
  return (
    <AriaCalendar
      {...props}
      aria-label={ariaLabel}
      onChange={onValueChange}
      {...sx(styles.calendar.root)}
      data-dowel-component="calendar"
    >
      <CalendarContents />
    </AriaCalendar>
  );
}

export function Calendar({ locale, ...props }: CalendarProps) {
  const calendar = <CalendarRoot {...props} />;
  return locale ? (
    <I18nProvider locale={locale}>{calendar}</I18nProvider>
  ) : (
    calendar
  );
}

export interface DatePickerProps
  extends Omit<
    AriaDatePickerProps<CalendarDate>,
    "children" | "className" | "onChange" | "style"
  > {
  label: string;
  description?: ReactNode;
  locale?: string;
  onValueChange?: (date: CalendarDate | null) => void;
}

function groupClassName({
  isDisabled,
  isFocusWithin,
  isInvalid,
}: GroupRenderProps) {
  return (
    sx(
      styles.picker.group,
      isFocusWithin && styles.picker.groupFocused,
      isInvalid && styles.picker.groupInvalid,
      isDisabled && styles.picker.disabled,
    ).className ?? ""
  );
}

function DatePickerRoot({
  label,
  description,
  onValueChange,
  ...props
}: Omit<DatePickerProps, "locale">) {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  return (
    <AriaDatePicker
      ref={setPortalContainer}
      {...props}
      onChange={onValueChange}
      {...sx(styles.picker.root)}
      data-dowel-component="date-picker"
    >
      <AriaLabel {...sx(styles.picker.label)}>{label}</AriaLabel>
      <AriaGroup className={groupClassName}>
        <AriaDateInput {...sx(styles.picker.input)}>
          {(segment) => (
            <AriaDateSegment segment={segment} {...sx(styles.picker.segment)} />
          )}
        </AriaDateInput>
        <AriaButton aria-label="Open calendar" {...sx(styles.picker.trigger)}>
          <CalendarDaysIcon width={14} height={14} aria-hidden="true" />
        </AriaButton>
      </AriaGroup>
      {description ? (
        <span slot="description" {...sx(styles.picker.description)}>
          {description}
        </span>
      ) : null}
      <AriaPopover
        placement="bottom start"
        offset={4}
        UNSTABLE_portalContainer={portalContainer ?? undefined}
        {...sx(styles.picker.popover)}
      >
        <AriaDialog {...sx(styles.picker.dialog)}>
          <AriaCalendar {...sx(styles.calendar.root)}>
            <CalendarContents />
          </AriaCalendar>
        </AriaDialog>
      </AriaPopover>
    </AriaDatePicker>
  );
}

export function DatePicker({ locale, ...props }: DatePickerProps) {
  const picker = <DatePickerRoot {...props} />;
  return locale ? (
    <I18nProvider locale={locale}>{picker}</I18nProvider>
  ) : (
    picker
  );
}

export { CalendarDate };
