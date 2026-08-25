import { createFileRoute } from "@tanstack/react-router";
import { Progress } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/progress")({
  component: ProgressDocs,
});

function ProgressDocs() {
  return (
    <DocsPage
      title="Progress"
      lead="Determinate and indeterminate task progress with localized values."
      toc={[{ id: "states", title: "Task states" }]}
    >
      <Section id="states" title="Task states">
        <Demo
          layout="stack"
          code={`<Progress label="Upload artifacts" value={64} />\n<Progress label="Connecting" value={null} showValue={false} />`}
        >
          <Progress label="Upload artifacts" value={64} />
          <Progress label="Connecting" value={null} showValue={false} />
        </Demo>
      </Section>
    </DocsPage>
  );
}
