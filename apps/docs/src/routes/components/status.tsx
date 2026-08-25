import { createFileRoute } from "@tanstack/react-router";
import { Status } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";
import { CheckIcon } from "../../components/icons";

export const Route = createFileRoute("/components/status")({
  component: StatusDocs,
});

const toc = [
  { id: "tones", title: "Tones" },
  { id: "semantics", title: "Semantics" },
];

function StatusDocs() {
  return (
    <DocsPage
      title="Status"
      lead="A compact icon and label for state that should scan without the visual weight of a badge."
      toc={toc}
    >
      <Section id="tones" title="Tones">
        <p>
          A semantic tone colors only the leading visual. Pass an icon when a
          dot is not specific enough for the state.
        </p>
        <Demo
          code={`<Status>Queued</Status>
<Status tone="accent">Running</Status>
<Status tone="success" icon={<CheckIcon />}>Passed</Status>
<Status tone="warning">Degraded</Status>
<Status tone="danger">Failed</Status>`}
        >
          <Status>Queued</Status>
          <Status tone="accent">Running</Status>
          <Status tone="success" icon={<CheckIcon />}>
            Passed
          </Status>
          <Status tone="warning">Degraded</Status>
          <Status tone="danger">Failed</Status>
        </Demo>
      </Section>

      <Section id="semantics" title="Semantics">
        <p>
          Status is not a live region by default. Add <code>role=status</code>
          only when an update should be politely announced as it changes.
        </p>
      </Section>
    </DocsPage>
  );
}
