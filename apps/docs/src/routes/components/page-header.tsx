import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, Button, PageHeader, Tabs } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/page-header")({
  component: PageHeaderDocs,
});

const toc = [
  { id: "composition", title: "Composition" },
  { id: "hierarchy", title: "Hierarchy" },
];

function PageHeaderExample() {
  return (
    <PageHeader
      headingLevel={3}
      title="Project settings"
      description="Manage defaults and access for the Dowel project."
      breadcrumbs={
        <Breadcrumbs
          items={[
            { label: "Workspace", href: "#workspace" },
            { label: "Dowel", href: "#dowel" },
            { label: "Settings", current: true },
          ]}
        />
      }
      actions={<Button variant="primary">Save changes</Button>}
    >
      <Tabs.Root defaultValue="general" variant="line" size="sm">
        <Tabs.List aria-label="Settings views">
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="members">Members</Tabs.Tab>
          <Tabs.Tab value="integrations">Integrations</Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>
    </PageHeader>
  );
}

function PageHeaderDocs() {
  return (
    <DocsPage
      title="Page Header"
      lead="A compact workspace heading with optional context, actions, and secondary navigation."
      toc={toc}
    >
      <Section id="composition" title="Composition">
        <p>
          Keep the title and primary page action together. Breadcrumbs add
          context only when the surrounding workspace does not already provide
          it. Children are reserved for tabs or filters below the title row.
        </p>
        <Demo
          layout="stack"
          code={`<PageHeader
  title="Project settings"
  description="Manage defaults and access for the Dowel project."
  breadcrumbs={<Breadcrumbs items={items} />}
  actions={<Button variant="primary">Save changes</Button>}
>
  <Tabs.Root variant="line">...</Tabs.Root>
</PageHeader>`}
        >
          <PageHeaderExample />
        </Demo>
      </Section>

      <Section id="hierarchy" title="Hierarchy">
        <p>
          The title is an h1 by default. Set headingLevel only when the header
          is nested inside a larger page or documentation example. Actions wrap
          while the title copy keeps the available width.
        </p>
      </Section>
    </DocsPage>
  );
}
