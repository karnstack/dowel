import { createFileRoute } from "@tanstack/react-router";
import { Calendar, DatePicker, parseDate } from "@karnstack/dowel";
import { useState } from "react";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/calendar")({
  component: CalendarDocs,
});

function CalendarExample() {
  const [date, setDate] = useState(parseDate("2026-08-12"));
  return (
    <div className="docs-calendar-example">
      <Calendar
        value={date}
        onValueChange={setDate}
        defaultFocusedValue={parseDate("2026-08-01")}
      />
      <output className="docs-calendar-value" aria-live="polite">
        Selected: <code>{date.toString()}</code>
      </output>
    </div>
  );
}

function CalendarDocs() {
  return (
    <DocsPage
      title="Calendar & Date Picker"
      lead="An internationalized month grid and segmented date field with timezone-safe CalendarDate values."
      toc={[
        { id: "calendar", title: "Calendar" },
        { id: "picker", title: "Date picker" },
      ]}
    >
      <Section id="calendar" title="Calendar">
        <Demo
          code={`const [date, setDate] = useState(parseDate("2026-08-12"));\n\n<Calendar value={date} onValueChange={setDate} />\n<output>Selected: {date.toString()}</output>`}
        >
          <CalendarExample />
        </Demo>
      </Section>
      <Section id="picker" title="Date picker">
        <p>
          DatePicker adds locale-aware editable segments and composes the same
          keyboard-navigable calendar into its popover.
        </p>
        <Demo
          code={`<DatePicker label="Due date" defaultValue={parseDate("2026-08-12")} />`}
        >
          <DatePicker label="Due date" defaultValue={parseDate("2026-08-12")} />
        </Demo>
      </Section>
    </DocsPage>
  );
}
