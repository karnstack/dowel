import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/spinner")({
  component: SpinnerDocs,
});

const toc = [
  { id: "sizes", title: "Sizes" },
  { id: "labels", title: "Loading labels" },
];

function SpinnerDocs() {
  return (
    <DocsPage
      title="Spinner"
      lead="Indeterminate progress for a wait whose completion percentage is unknown."
      toc={toc}
    >
      <Section id="sizes" title="Sizes">
        <p>
          Choose the size that matches the nearby control or content density.
        </p>
        <Demo
          code={`<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`}
        >
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
        </Demo>
      </Section>

      <Section id="labels" title="Loading labels">
        <p>
          The default accessible label is “Loading”. Pass a more specific label
          when the surrounding context does not already explain the pending
          work.
        </p>
      </Section>
    </DocsPage>
  );
}
