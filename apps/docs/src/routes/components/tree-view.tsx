import { createFileRoute } from "@tanstack/react-router";
import { TreeView } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/tree-view")({
  component: TreeViewDocs,
});

const items = [
  {
    id: "product",
    label: "Product",
    children: [
      { id: "roadmap", label: "Roadmap" },
      { id: "feedback", label: "Feedback" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    children: [
      { id: "platform", label: "Platform" },
      { id: "web", label: "Web" },
    ],
  },
];

function TreeViewDocs() {
  return (
    <DocsPage
      title="Tree View"
      lead="A nested, keyboard-navigable hierarchy with controlled selection and expansion."
      toc={[{ id: "default", title: "Workspace hierarchy" }]}
    >
      <Section id="default" title="Workspace hierarchy">
        <Demo
          layout="stack"
          code={`<TreeView items={items} defaultExpandedIds={["product"]} />`}
        >
          <TreeView items={items} defaultExpandedIds={["product"]} />
        </Demo>
      </Section>
    </DocsPage>
  );
}
