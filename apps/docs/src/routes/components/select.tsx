import { createFileRoute } from "@tanstack/react-router";
import { Field, Select } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/select")({
  component: SelectDocs,
});

const providerOptions = [
  { value: "github", label: "GitHub", group: "Cloud" },
  { value: "gitlab", label: "GitLab", group: "Cloud" },
  {
    value: "self-hosted",
    label: "Self-hosted Git",
    description: "Connect an internal Git server",
    group: "Advanced",
  },
];

const toc = [
  { id: "default", title: "Grouped options" },
  { id: "forms", title: "Forms" },
  { id: "behavior", title: "Behavior" },
];

function SelectDocs() {
  return (
    <DocsPage
      title="Select"
      lead="A quiet single-choice popup with groups, descriptions, keyboard navigation, and native form values."
      toc={toc}
    >
      <Section id="default" title="Grouped options">
        <p>
          The trigger matches Input geometry. Group labels and descriptions add
          structure without turning a routine choice into a command menu.
        </p>
        <Demo
          layout="stack"
          code={`import { Select } from "@karnstack/dowel";

const providers = [
  { value: "github", label: "GitHub", group: "Cloud" },
  { value: "gitlab", label: "GitLab", group: "Cloud" },
  { value: "self-hosted", label: "Self-hosted Git", description: "Internal Git server", group: "Advanced" },
];

<Select label="Git provider" options={providers} defaultValue="github" />`}
        >
          <Select
            label="Git provider"
            options={providerOptions}
            defaultValue="github"
          />
        </Demo>
      </Section>

      <Section id="forms" title="Forms">
        <p>
          Pass <code>name</code> to submit the selected string through the
          hidden native control. Field supplies the visible label while the
          required <code>label</code> prop names the combobox.
        </p>
        <Demo
          layout="stack"
          code={`<Field.Root>
  <Field.Label>Repository visibility</Field.Label>
  <Select
    label="Repository visibility"
    name="visibility"
    options={[
      { value: "private", label: "Private" },
      { value: "public", label: "Public" },
    ]}
    defaultValue="private"
  />
</Field.Root>`}
        >
          <Field.Root>
            <Field.Label>Repository visibility</Field.Label>
            <Select
              label="Repository visibility"
              name="visibility"
              options={[
                { value: "private", label: "Private" },
                { value: "public", label: "Public" },
              ]}
              defaultValue="private"
            />
          </Field.Root>
        </Demo>
      </Section>

      <Section id="behavior" title="Behavior">
        <p>
          Enter, Space, or Arrow Down opens the list. Arrow keys move the
          highlighted option, typing performs typeahead, Enter selects, and
          Escape closes without changing the value. The popup inherits the
          active Dowel theme through its portal.
        </p>
      </Section>
    </DocsPage>
  );
}
