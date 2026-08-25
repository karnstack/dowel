import { createFileRoute } from "@tanstack/react-router";
import { Button, EmptyState } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";
import { SearchIcon } from "../../components/icons";

export const Route = createFileRoute("/components/empty-state")({
  component: EmptyStateDocs,
});

const toc = [
  { id: "first-use", title: "First-use state" },
  { id: "no-results", title: "No-results state" },
];

function EmptyStateDocs() {
  return (
    <DocsPage
      title="Empty State"
      lead="Structured guidance for an empty collection, a first-use surface, or a search with no matches."
      toc={toc}
    >
      <Section id="first-use" title="First-use state">
        <p>
          Explain what belongs here, then offer one clear next action. Match the
          heading level to the surrounding page structure.
        </p>
        <Demo
          layout="stack"
          code={`<EmptyState
  title="No repositories"
  description="Connect a repository to start mirroring code."
  actions={<Button variant="primary">Connect repository</Button>}
/>`}
        >
          <EmptyState
            title="No repositories"
            description="Connect a repository to start mirroring code."
            actions={<Button variant="primary">Connect repository</Button>}
          />
        </Demo>
      </Section>

      <Section id="no-results" title="No-results state">
        <p>
          A compact empty state fits inside filtered lists and search results.
          Keep the recovery action close to the explanation.
        </p>
        <Demo
          layout="stack"
          code={`<EmptyState
  size="compact"
  icon={<SearchIcon />}
  title="No matching repositories"
  description="Try a different name or clear the active filters."
  actions={<Button size="sm">Clear filters</Button>}
/>`}
        >
          <EmptyState
            size="compact"
            icon={<SearchIcon />}
            title="No matching repositories"
            description="Try a different name or clear the active filters."
            actions={<Button size="sm">Clear filters</Button>}
          />
        </Demo>
      </Section>
    </DocsPage>
  );
}
