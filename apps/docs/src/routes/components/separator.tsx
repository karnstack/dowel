import { createFileRoute } from "@tanstack/react-router";
import { Separator, Status } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/separator")({
  component: SeparatorDocs,
});

const toc = [
  { id: "orientation", title: "Orientation" },
  { id: "semantics", title: "Semantics" },
];

function SeparatorDocs() {
  return (
    <DocsPage
      title="Separator"
      lead="A quiet horizontal or vertical divider for content that needs a little more separation than whitespace."
      toc={toc}
    >
      <Section id="orientation" title="Orientation">
        <p>
          Horizontal separators fill their container. Vertical separators
          stretch to the height of their flex row.
        </p>
        <Demo
          layout="stack"
          code={`<Status tone="success">Checks passed</Status>
<Separator />
<Status>Updated two minutes ago</Status>`}
        >
          <Status tone="success">Checks passed</Status>
          <Separator />
          <Status>Updated two minutes ago</Status>
        </Demo>
      </Section>

      <Section id="semantics" title="Semantics">
        <p>
          Separator is decorative by default. Set <code>decorative=false</code>
          when the divider represents a meaningful boundary that belongs in the
          accessibility tree.
        </p>
      </Section>
    </DocsPage>
  );
}
