import { createFileRoute } from "@tanstack/react-router";
import { Button, SettingsRow, SettingsSection, Switch } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/settings")({
  component: SettingsDocs,
});

const toc = [
  { id: "section", title: "Settings section" },
  { id: "controls", title: "Control labels" },
];

function SettingsExample() {
  return (
    <SettingsSection
      headingLevel={3}
      title="Notifications"
      description="Choose which updates reach your inbox."
    >
      <SettingsRow
        title="Issue activity"
        description="Comments, assignments, and status changes."
      >
        <Switch aria-label="Issue activity" defaultChecked />
      </SettingsRow>
      <SettingsRow
        title="Weekly digest"
        description="A summary every Monday morning."
      >
        <Switch aria-label="Weekly digest" />
      </SettingsRow>
      <SettingsRow title="Notification rules">
        <Button size="sm">Manage</Button>
      </SettingsRow>
    </SettingsSection>
  );
}

function SettingsDocs() {
  return (
    <DocsPage
      title="Settings"
      lead="Quiet section and row primitives for compact preference screens."
      toc={toc}
    >
      <Section id="section" title="Settings section">
        <p>
          Sections introduce one related set of preferences. Rows use dividers
          instead of cards, keep explanatory copy flexible, and reserve the end
          of each row for one labelled control or action.
        </p>
        <Demo
          layout="stack"
          code={`<SettingsSection
  title="Notifications"
  description="Choose which updates reach your inbox."
>
  <SettingsRow title="Issue activity" description="Comments and assignments.">
    <Switch aria-label="Issue activity" defaultChecked />
  </SettingsRow>
  <SettingsRow title="Notification rules">
    <Button size="sm">Manage</Button>
  </SettingsRow>
</SettingsSection>`}
        >
          <SettingsExample />
        </Demo>
      </Section>

      <Section id="controls" title="Control labels">
        <p>
          Row copy is visible context, but interactive children still need their
          own accessible name. Use aria-label when a Switch or icon-only action
          does not include visible text.
        </p>
      </Section>
    </DocsPage>
  );
}
