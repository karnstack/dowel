import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/switch")({
  component: SwitchDocs,
});

const toc = [
  { id: "setting", title: "Immediate setting" },
  { id: "states", title: "States" },
  { id: "behavior", title: "Behavior" },
];

function SwitchDocs() {
  return (
    <DocsPage
      title="Switch"
      lead="A compact binary setting whose effect is immediate rather than deferred to a form submission."
      toc={toc}
    >
      <Section id="setting" title="Immediate setting">
        <p>
          The visible label names the state being controlled. Use Checkbox when
          the choice belongs to a group that is submitted together.
        </p>
        <Demo
          layout="start"
          code={`import { Switch } from "@karnstack/dowel";

<label>
  <Switch name="mirror" defaultChecked />
  Mirror native repository to GitHub
</label>`}
        >
          <label className="docs-choice-label">
            <Switch name="mirror" defaultChecked />
            Mirror native repository to GitHub
          </label>
        </Demo>
      </Section>

      <Section id="states" title="States">
        <Demo
          layout="stack"
          code={`<label><Switch /> Off</label>
<label><Switch defaultChecked /> On</label>
<label><Switch disabled /> Unavailable</label>`}
        >
          <div className="docs-choice-list">
            <label className="docs-choice-label">
              <Switch /> Off
            </label>
            <label className="docs-choice-label">
              <Switch defaultChecked /> On
            </label>
            <label className="docs-choice-label" data-disabled>
              <Switch disabled /> Unavailable
            </label>
          </div>
        </Demo>
      </Section>

      <Section id="behavior" title="Behavior">
        <p>
          Space toggles the focused switch. Controlled and uncontrolled state
          use <code>checked</code>, <code>defaultChecked</code>, and{" "}
          <code>onCheckedChange</code>. The hidden input preserves native form
          submission.
        </p>
      </Section>
    </DocsPage>
  );
}
