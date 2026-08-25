import { createFileRoute } from "@tanstack/react-router";
import { Checkbox, CheckboxGroup } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/checkbox")({
  component: CheckboxDocs,
});

const toc = [
  { id: "group", title: "Checkbox group" },
  { id: "states", title: "States" },
  { id: "behavior", title: "Behavior" },
];

function CheckboxDocs() {
  return (
    <DocsPage
      title="Checkbox"
      lead="Independent and grouped choices with mixed state, native form values, and a precise 16px control."
      toc={toc}
    >
      <Section id="group" title="Checkbox group">
        <p>
          Wrap each control in its visible label. CheckboxGroup coordinates a
          string array while each Checkbox keeps native form behavior.
        </p>
        <Demo
          layout="stack"
          code={`import { Checkbox, CheckboxGroup } from "@karnstack/dowel";

<CheckboxGroup defaultValue={["required"]}>
  <label><Checkbox value="required" /> Require successful checks</label>
  <label><Checkbox value="threads" /> Require resolved threads</label>
  <label><Checkbox value="signed" /> Require signed commits</label>
</CheckboxGroup>`}
        >
          <CheckboxGroup defaultValue={["required"]}>
            <label className="docs-choice-label">
              <Checkbox value="required" /> Require successful checks
            </label>
            <label className="docs-choice-label">
              <Checkbox value="threads" /> Require resolved threads
            </label>
            <label className="docs-choice-label">
              <Checkbox value="signed" /> Require signed commits
            </label>
          </CheckboxGroup>
        </Demo>
      </Section>

      <Section id="states" title="States">
        <p>
          Mixed state is for a parent choice whose children do not share one
          value. Disabled choices remain visible and named.
        </p>
        <Demo
          layout="stack"
          code={`<label><Checkbox defaultChecked /> Checked</label>
<label><Checkbox indeterminate /> Some repositories</label>
<label><Checkbox disabled /> Unavailable</label>`}
        >
          <div className="docs-choice-list">
            <label className="docs-choice-label">
              <Checkbox defaultChecked /> Checked
            </label>
            <label className="docs-choice-label">
              <Checkbox indeterminate /> Some repositories
            </label>
            <label className="docs-choice-label" data-disabled>
              <Checkbox disabled /> Unavailable
            </label>
          </div>
        </Demo>
      </Section>

      <Section id="behavior" title="Behavior">
        <p>
          Space toggles the focused control. A checked Checkbox submits its
          value through the hidden native input. An unchecked control submits
          nothing unless <code>uncheckedValue</code> is provided.
        </p>
      </Section>
    </DocsPage>
  );
}
