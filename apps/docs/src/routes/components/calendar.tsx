import { createFileRoute } from "@tanstack/react-router";
import { Calendar, DatePicker } from "@karnstack/dowel";
import { useState } from "react";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/calendar")({
  component: CalendarDocs,
});

function CalendarExample() {
  const [date, setDate] = useState(new Date(2026, 7, 12));
  return (
    <Calendar
      value={date}
      onValueChange={setDate}
      defaultMonth={new Date(2026, 7, 1)}
    />
  );
}

function CalendarDocs() {
  return (
    <DocsPage
      title="Calendar & Date Picker"
      lead="A date-fns-backed month grid and compact popover field with native Date values."
      toc={[
        { id: "calendar", title: "Calendar" },
        { id: "picker", title: "Date picker" },
      ]}
    >
      <Section id="calendar" title="Calendar">
        <Demo
          code={`const [date, setDate] = useState(new Date());\n\n<Calendar value={date} onValueChange={setDate} />`}
        >
          <CalendarExample />
        </Demo>
      </Section>
      <Section id="picker" title="Date picker">
        <p>
          DatePicker composes the same calendar into a labelled popover trigger.
        </p>
        <Demo
          code={`<DatePicker label="Due date" defaultValue={new Date(2026, 7, 12)} />`}
        >
          <DatePicker label="Due date" defaultValue={new Date(2026, 7, 12)} />
        </Demo>
      </Section>
    </DocsPage>
  );
}
