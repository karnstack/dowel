import { createFileRoute } from "@tanstack/react-router";
import { PropertyPicker } from "dowel";
import { useState } from "react";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/property-picker")({
  component: PropertyPickerDocs,
});

const toc = [
  { id: "status", title: "Status property" },
  { id: "behavior", title: "Behavior" },
];

const statusOptions = [
  {
    value: "triage",
    label: "Triage",
    description: "Needs review",
    group: "Active",
    icon: "◇",
  },
  {
    value: "backlog",
    label: "Backlog",
    description: "Ready to prioritize",
    group: "Active",
    icon: "○",
  },
  {
    value: "started",
    label: "In progress",
    description: "Actively being worked on",
    group: "Active",
    icon: "◐",
    tone: "accent" as const,
  },
  {
    value: "done",
    label: "Done",
    description: "Completed work",
    group: "Closed",
    icon: "✓",
  },
  {
    value: "canceled",
    label: "Canceled",
    description: "No longer planned",
    group: "Closed",
    icon: "×",
  },
];

function PropertyPickerDocs() {
  const [status, setStatus] = useState<string | null>("started");

  return (
    <DocsPage
      title="Property Picker"
      lead="A searchable metadata picker for status, priority, assignee, project, labels, dates, and similar SaaS properties."
      toc={toc}
    >
      <Section id="status" title="Status property">
        <p>
          The compact trigger shows the current value. Opening it moves focus
          directly into a borderless search field, keeps groups intact while
          filtering, and marks the selected row without turning the whole
          surface into a wall of borders.
        </p>
        <Demo
          layout="start"
          code={`const statusOptions = [
  { value: "triage", label: "Triage", group: "Active" },
  { value: "started", label: "In progress", group: "Active" },
  { value: "done", label: "Done", group: "Closed" },
];

<PropertyPicker
  label="Status"
  name="status"
  options={statusOptions}
  value={status}
  onValueChange={setStatus}
/>`}
        >
          <PropertyPicker
            label="Status"
            name="status"
            options={statusOptions}
            value={status}
            onValueChange={setStatus}
          />
        </Demo>
      </Section>

      <Section id="behavior" title="Behavior">
        <p>
          Selection works with pointer, Enter, and arrow keys. Escape closes the
          picker and returns focus to the pill. Optional properties expose a
          clear action, and the selected string is submitted through a native
          hidden form field when a name is provided.
        </p>
        <p className="docs-note">
          Pass stable string values. Labels, descriptions, icons, and grouping
          can change without changing the form value or controlled state.
        </p>
      </Section>
    </DocsPage>
  );
}
