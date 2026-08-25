import { createFileRoute } from "@tanstack/react-router";
import { Tabs } from "dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/tabs")({
  component: TabsDocs,
});

const toc = [
  { id: "pill", title: "Pill tabs" },
  { id: "line", title: "Line tabs" },
  { id: "keyboard", title: "Keyboard" },
];

function TabsDocs() {
  return (
    <DocsPage
      title="Tabs"
      lead="Compact view switching with automatic keyboard activation."
      toc={toc}
    >
      <Section id="pill" title="Pill tabs">
        <p>
          The default treatment matches dense application headers. Each tab is a
          separate quiet control, so the list does not need a surrounding track
          or divider.
        </p>
        <Demo
          layout="stack"
          code={`import { Tabs } from "dowel";

<Tabs.Root defaultValue="assigned">
  <Tabs.List aria-label="Issue views">
    <Tabs.Tab value="assigned">Assigned</Tabs.Tab>
    <Tabs.Tab value="created">Created</Tabs.Tab>
    <Tabs.Tab value="subscribed">Subscribed</Tabs.Tab>
    <Tabs.Tab value="activity">Activity</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="assigned">Assigned issues</Tabs.Panel>
  <Tabs.Panel value="created">Created issues</Tabs.Panel>
  <Tabs.Panel value="subscribed">Subscribed issues</Tabs.Panel>
  <Tabs.Panel value="activity">Recent activity</Tabs.Panel>
</Tabs.Root>`}
        >
          <Tabs.Root defaultValue="assigned">
            <Tabs.List aria-label="Issue views">
              <Tabs.Tab value="assigned">Assigned</Tabs.Tab>
              <Tabs.Tab value="created">Created</Tabs.Tab>
              <Tabs.Tab value="subscribed">Subscribed</Tabs.Tab>
              <Tabs.Tab value="activity">Activity</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="assigned">
              <p className="docs-inline-sample">Assigned issues</p>
            </Tabs.Panel>
            <Tabs.Panel value="created">
              <p className="docs-inline-sample">Created issues</p>
            </Tabs.Panel>
            <Tabs.Panel value="subscribed">
              <p className="docs-inline-sample">Subscribed issues</p>
            </Tabs.Panel>
            <Tabs.Panel value="activity">
              <p className="docs-inline-sample">Recent activity</p>
            </Tabs.Panel>
          </Tabs.Root>
        </Demo>
      </Section>

      <Section id="line" title="Line tabs">
        <p>
          Use the line treatment when tabs sit directly above related content.
          It marks only the active label and deliberately avoids a full-width
          divider.
        </p>
        <Demo
          layout="stack"
          code={`<Tabs.Root defaultValue="overview" variant="line">
  <Tabs.List aria-label="Project views">
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="activity">Activity</Tabs.Tab>
    <Tabs.Tab value="issues">Issues</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">Project overview</Tabs.Panel>
  <Tabs.Panel value="activity">Project activity</Tabs.Panel>
  <Tabs.Panel value="issues">Project issues</Tabs.Panel>
</Tabs.Root>`}
        >
          <Tabs.Root defaultValue="overview" variant="line">
            <Tabs.List aria-label="Project views">
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="activity">Activity</Tabs.Tab>
              <Tabs.Tab value="issues">Issues</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">
              <p className="docs-inline-sample">Project overview</p>
            </Tabs.Panel>
            <Tabs.Panel value="activity">
              <p className="docs-inline-sample">Project activity</p>
            </Tabs.Panel>
            <Tabs.Panel value="issues">
              <p className="docs-inline-sample">Project issues</p>
            </Tabs.Panel>
          </Tabs.Root>
        </Demo>
      </Section>

      <Section id="keyboard" title="Keyboard">
        <p>
          Arrow keys move and activate in one step. Home and End jump across the
          list. Tab moves from the active label into the active panel. Disabled
          tabs can receive focus so their presence is discoverable, but they
          cannot activate.
        </p>
      </Section>
    </DocsPage>
  );
}
