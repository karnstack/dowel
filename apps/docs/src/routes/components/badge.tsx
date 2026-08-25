import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/badge")({
  component: BadgeDocs,
});

const toc = [
  { id: "tones", title: "Tones" },
  { id: "in-context", title: "In context" },
];

function BadgeDocs() {
  return (
    <DocsPage
      title="Badge"
      lead="Compact status and metadata in five restrained tones."
      toc={toc}
    >
      <Section id="tones" title="Tones">
        <p>
          Use <code>neutral</code> by default. Add a tone and dot when the state
          needs to scan quickly in a dense list.
        </p>
        <Demo
          code={`import { Badge } from "@karnstack/dowel";

<Badge>Neutral</Badge>
<Badge dot tone="accent">Beta</Badge>
<Badge dot tone="success">Shipped</Badge>
<Badge dot tone="warning">Deprecated</Badge>
<Badge dot tone="danger">Breaking</Badge>`}
        >
          <Badge>Neutral</Badge>
          <Badge dot tone="accent">
            Beta
          </Badge>
          <Badge dot tone="success">
            Shipped
          </Badge>
          <Badge dot tone="warning">
            Deprecated
          </Badge>
          <Badge dot tone="danger">
            Breaking
          </Badge>
        </Demo>
      </Section>

      <Section id="in-context" title="In context">
        <p>
          A badge sits at 22px so it aligns to a line of body text rather than
          to a control. It renders a <code>span</code>, so it flows inline.
        </p>
        <Demo
          layout="stack"
          code={`<p>
  dowel is <Badge tone="warning">pre-1.0</Badge>. The API will
  change between minor versions.
</p>`}
        >
          <p className="docs-inline-sample">
            dowel is <Badge tone="warning">pre-1.0</Badge>. The API will change
            between minor versions.
          </p>
        </Demo>
      </Section>
    </DocsPage>
  );
}
