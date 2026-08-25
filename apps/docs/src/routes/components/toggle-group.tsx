import { createFileRoute } from "@tanstack/react-router";
import { ToggleGroup } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/toggle-group")({
  component: ToggleGroupDocs,
});

function ToggleGroupDocs() {
  return (
    <DocsPage
      title="Toggle Group"
      lead="A connected set of independently pressed controls for compact view options."
      toc={[{ id: "default", title: "View options" }]}
    >
      <Section id="default" title="View options">
        <Demo
          code={`<ToggleGroup.Root aria-label="View options">\n  <ToggleGroup.Item defaultPressed>List</ToggleGroup.Item>\n  <ToggleGroup.Item>Board</ToggleGroup.Item>\n</ToggleGroup.Root>`}
        >
          <ToggleGroup.Root aria-label="View options">
            <ToggleGroup.Item defaultPressed>List</ToggleGroup.Item>
            <ToggleGroup.Item>Board</ToggleGroup.Item>
            <ToggleGroup.Item>Timeline</ToggleGroup.Item>
          </ToggleGroup.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
