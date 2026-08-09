import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "dowel";

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
      lead="A compact pill for status and metadata. Five tones, one size — a badge that competes with a control for attention is a badge doing the wrong job."
      toc={toc}
    >
      <Section id="tones" title="Tones">
        <p>
          Tone carries meaning, not decoration. <code>neutral</code> is the
          default and the right answer most of the time; the four coloured tones
          all read as state.
        </p>
        <Demo
          code={`import { Badge } from "dowel";

<Badge>Neutral</Badge>
<Badge tone="accent">Accent</Badge>
<Badge tone="success">Shipped</Badge>
<Badge tone="warning">Deprecated</Badge>
<Badge tone="danger">Breaking</Badge>`}
        >
          <Badge>Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success">Shipped</Badge>
          <Badge tone="warning">Deprecated</Badge>
          <Badge tone="danger">Breaking</Badge>
        </Demo>
      </Section>

      <Section id="in-context" title="In context">
        <p>
          A badge sits at 20px so it aligns to a line of body text rather than
          to a control. It renders a <code>span</code>, so it flows inline.
        </p>
        <Demo
          layout="stack"
          code={`<p>
  dowel is <Badge tone="warning">pre-1.0</Badge> — the API will
  change between minor versions.
</p>`}
        >
          <p className="docs-inline-sample">
            dowel is <Badge tone="warning">pre-1.0</Badge> — the API will change
            between minor versions.
          </p>
        </Demo>
      </Section>
    </DocsPage>
  );
}
