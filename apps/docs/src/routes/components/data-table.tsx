import { createFileRoute } from "@tanstack/react-router";
import { Badge, DataTable, createDataTableColumnHelper } from "dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/data-table")({
  component: DataTableDocs,
});

type Issue = {
  id: string;
  title: string;
  status: "started" | "planned" | "done";
  team: string;
  updated: string;
};

const issues: Issue[] = [
  {
    id: "ACM-318",
    title: "Refine keyboard navigation in command menu",
    status: "started",
    team: "Platform",
    updated: "Today",
  },
  {
    id: "ACM-294",
    title: "Add usage summary to workspace settings",
    status: "planned",
    team: "Growth",
    updated: "Yesterday",
  },
  {
    id: "ACM-271",
    title: "Reduce initial dashboard render time",
    status: "done",
    team: "Performance",
    updated: "Aug 21",
  },
  {
    id: "ACM-263",
    title: "Unify project and initiative filters",
    status: "planned",
    team: "Product",
    updated: "Aug 19",
  },
  {
    id: "ACM-247",
    title: "Preserve sidebar width across sessions",
    status: "done",
    team: "Platform",
    updated: "Aug 16",
  },
];

const helper = createDataTableColumnHelper<Issue>();
const columns = helper.columns([
  helper.accessor("id", {
    header: "Issue",
    size: 88,
    meta: { mono: true, tone: "tertiary" },
  }),
  helper.accessor("title", {
    header: "Title",
    size: 240,
    meta: { grow: true },
    cell: ({ row, getValue }) => (
      <span className="docs-issue-title">
        <span className="docs-status-dot" data-status={row.original.status} />
        <span>{getValue()}</span>
      </span>
    ),
  }),
  helper.accessor("team", {
    header: "Team",
    size: 112,
    meta: { align: "end", truncate: false },
    cell: ({ getValue }) => <Badge>{getValue()}</Badge>,
  }),
  helper.accessor("updated", {
    header: "Updated",
    size: 72,
    meta: { align: "end", tone: "tertiary" },
  }),
]);

const toc = [
  { id: "issue-list", title: "Issue list" },
  { id: "states", title: "States" },
  { id: "behavior", title: "Behavior" },
];

function IssueTable({ showHeader = false }: { showHeader?: boolean }) {
  return (
    <DataTable
      aria-label="Issues"
      columns={columns}
      data={issues}
      getRowId={(issue) => issue.id}
      selectable
      showHeader={showHeader}
    />
  );
}

function DataTableDocs() {
  return (
    <DocsPage
      title="Data Table"
      lead="A quiet, high-density table for issue lists, customers, billing, and operations."
      toc={toc}
    >
      <Section id="issue-list" title="Issue list">
        <p>
          Rows sit directly on the page without a boxed grid. Identity stays on
          the left, the title absorbs available space, and metadata remains
          quiet on the right.
        </p>
        <Demo
          layout="start"
          code={`import { DataTable, createDataTableColumnHelper } from "dowel";

const column = createDataTableColumnHelper<Issue>();
const columns = column.columns([
  column.accessor("id", { header: "Issue", size: 96 }),
  column.accessor("title", { header: "Title", meta: { grow: true } }),
  column.accessor("updated", { header: "Updated", meta: { align: "end" } }),
]);

<DataTable
  aria-label="Issues"
  columns={columns}
  data={issues}
  getRowId={(issue) => issue.id}
  selectable
  showHeader={false}
/>`}
        >
          <div className="docs-data-table-demo">
            <IssueTable />
          </div>
        </Demo>
      </Section>

      <Section id="states" title="States">
        <p>
          Loading keeps the table geometry stable. Empty results get one calm
          message instead of a large illustration or promotional copy.
        </p>
        <div className="docs-data-table-states">
          <DataTable
            aria-label="Loading issues"
            columns={columns}
            data={[]}
            loading
            loadingRows={3}
          />
          <DataTable
            aria-label="Empty issues"
            columns={columns}
            data={[]}
            emptyTitle="No matching issues"
            emptyDescription="Try a different filter."
          />
        </div>
      </Section>

      <Section id="behavior" title="Behavior">
        <p>
          Show the header to expose sorting and column resizing. Sort controls,
          selection boxes, rows, and resize handles all carry visible keyboard
          focus. Resize with the pointer or Left and Right Arrow, then double
          click the handle to restore its original width.
        </p>
        <div className="docs-data-table-demo docs-data-table-header-demo">
          <IssueTable showHeader />
        </div>
      </Section>
    </DocsPage>
  );
}
