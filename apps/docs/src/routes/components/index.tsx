import { createFileRoute } from "@tanstack/react-router";

import { ComponentGrid, DocsPage } from "../../components/docs-page";
import { componentNav } from "../../lib/nav";

export const Route = createFileRoute("/components/")({
  component: ComponentsIndex,
});

function ComponentsIndex() {
  return (
    <DocsPage
      eyebrow="Library"
      title="Components"
      lead={`${componentNav.length} components. Open one for live examples and API details.`}
    >
      <ComponentGrid />
    </DocsPage>
  );
}
