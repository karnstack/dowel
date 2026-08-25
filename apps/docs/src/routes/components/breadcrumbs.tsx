import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/breadcrumbs")({
  component: BreadcrumbsDocs,
});

const items = [
  { label: "Workspace", href: "#workspace" },
  { label: "Projects", href: "#projects" },
  { label: "Dowel", current: true },
];

function BreadcrumbsDocs() {
  return (
    <DocsPage
      title="Breadcrumbs"
      lead="A compact location trail with automatic middle-item elision."
      toc={[{ id: "default", title: "Location trail" }]}
    >
      <Section id="default" title="Location trail">
        <Demo code={`<Breadcrumbs items={items} />`} layout="stack">
          <Breadcrumbs items={items} />
        </Demo>
      </Section>
    </DocsPage>
  );
}
