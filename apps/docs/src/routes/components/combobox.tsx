import { createFileRoute } from "@tanstack/react-router";
import { Combobox, Field } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/combobox")({
  component: ComboboxDocs,
});

const organizations = [
  { value: "acme", label: "Acme", group: "Organizations" },
  {
    value: "northstar",
    label: "Northstar",
    description: "12 repositories",
    group: "Organizations",
  },
  { value: "personal", label: "Personal workspace", group: "Workspaces" },
];

function ComboboxDocs() {
  return (
    <DocsPage
      title="Combobox"
      lead="A filterable single-choice field for larger predefined collections."
      toc={[
        { id: "default", title: "Filter and select" },
        { id: "behavior", title: "Behavior" },
      ]}
    >
      <Section id="default" title="Filter and select">
        <p>
          Use Combobox when Select would make someone scan too many options.
        </p>
        <Demo
          layout="stack"
          code={`<Field.Root>\n  <Field.Label>Organization</Field.Label>\n  <Combobox label="Organization" options={organizations} />\n</Field.Root>`}
        >
          <Field.Root>
            <Field.Label>Organization</Field.Label>
            <Combobox
              label="Organization"
              options={organizations}
              placeholder="Find an organization"
            />
          </Field.Root>
        </Demo>
      </Section>
      <Section id="behavior" title="Behavior">
        <p>
          Typing filters labels, descriptions, and groups. Arrow keys move
          through results, Enter selects, Escape closes, and the clear button
          resets the value.
        </p>
      </Section>
    </DocsPage>
  );
}
