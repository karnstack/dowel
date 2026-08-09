import { createFileRoute } from "@tanstack/react-router";

import { ComponentGrid, DocsPage } from "../../components/docs-page";

export const Route = createFileRoute("/components/")({
  component: ComponentsIndex,
});

function ComponentsIndex() {
  return (
    <DocsPage
      eyebrow="Overview"
      title="All components"
      lead="Eight components, one look. Every one of them ships its own appearance and refuses className and style, so what you compose is behaviour and content."
    >
      <ComponentGrid />
    </DocsPage>
  );
}
