import { createFileRoute } from "@tanstack/react-router";

import { ComponentGrid, DocsPage } from "../../components/docs-page";

export const Route = createFileRoute("/components/")({
  component: ComponentsIndex,
});

function ComponentsIndex() {
  return (
    <DocsPage
      eyebrow="Library"
      title="Components"
      lead="Ten components. Open one for live examples and API details."
    >
      <ComponentGrid />
    </DocsPage>
  );
}
