import { createFileRoute } from "@tanstack/react-router";
import { Pagination } from "@karnstack/dowel";
import { useState } from "react";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/pagination")({
  component: PaginationDocs,
});

function PaginationExample() {
  const [page, setPage] = useState(4);
  return <Pagination page={page} totalPages={12} onPageChange={setPage} />;
}

function PaginationDocs() {
  return (
    <DocsPage
      title="Pagination"
      lead="Controlled page navigation with resilient bounds and compact elision."
      toc={[{ id: "default", title: "Page navigation" }]}
    >
      <Section id="default" title="Page navigation">
        <Demo
          code={`const [page, setPage] = useState(4);\n\n<Pagination page={page} totalPages={12} onPageChange={setPage} />`}
        >
          <PaginationExample />
        </Demo>
      </Section>
    </DocsPage>
  );
}
