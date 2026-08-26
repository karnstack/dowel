import {
  ArchiveBoxIcon,
  CalendarDaysIcon,
  EllipsisHorizontalIcon,
  QueueListIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import { createFileRoute } from "@tanstack/react-router";
import {
  Badge,
  Button,
  DataTable,
  FilterBar,
  FilterPicker,
  IconButton,
  MultiSelectToolbar,
  ViewOptions,
  createDataTableColumnHelper,
} from "@karnstack/dowel";
import type {
  DataTableColumnVisibilityState,
  DataTableDensity,
  DataTableRowSelectionState,
  DataTableSortingState,
  FilterBarFilter,
  FilterPickerProperty,
} from "@karnstack/dowel";
import { useState } from "react";

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

const statusLabels: Record<Issue["status"], string> = {
  started: "In progress",
  planned: "Planned",
  done: "Completed",
};

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
    size: 84,
    meta: { align: "end", tone: "tertiary" },
  }),
]);

const initialFilters: FilterBarFilter[] = [
  { id: "status", label: "Status", value: "Active" },
  { id: "team", label: "Team", value: "All teams" },
];

const filterProperties: FilterPickerProperty[] = [
  {
    id: "status",
    label: "Status",
    icon: <QueueListIcon width={16} height={16} />,
    values: [
      { value: "active", label: "Active", count: 3 },
      { value: "planned", label: "Planned", count: 2 },
      { value: "done", label: "Completed", count: 2 },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: <UserGroupIcon width={16} height={16} />,
    values: [
      { value: "platform", label: "Platform", count: 2 },
      { value: "growth", label: "Growth", count: 1 },
      { value: "product", label: "Product", count: 1 },
      { value: "performance", label: "Performance", count: 1 },
    ],
  },
  {
    id: "updated",
    label: "Updated",
    icon: <CalendarDaysIcon width={16} height={16} />,
    values: [
      { value: "today", label: "Today" },
      { value: "week", label: "Past week" },
      { value: "month", label: "Past month" },
    ],
  },
];

const toc = [
  { id: "collection-view", title: "Collection view" },
  { id: "states", title: "States" },
  { id: "behavior", title: "Behavior" },
];

function CollectionView() {
  const [density, setDensity] = useState<DataTableDensity>("compact");
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("updated");
  const [sorting, setSorting] = useState<DataTableSortingState>([
    { id: "updated", desc: false },
  ]);
  const [columnVisibility, setColumnVisibility] =
    useState<DataTableColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState<DataTableRowSelectionState>(
    {},
  );
  const [filters, setFilters] = useState<FilterBarFilter[]>(initialFilters);

  function updateOrdering(value: string) {
    setOrdering(value);
    setSorting(
      value === "title"
        ? [{ id: "title", desc: false }]
        : [{ id: "updated", desc: false }],
    );
  }

  const selectedCount = Object.values(rowSelection).filter(Boolean).length;

  function addFilter(propertyId: string, value: string) {
    const property = filterProperties.find((item) => item.id === propertyId);
    const option = property?.values.find((item) => item.value === value);
    if (!property || !option) return;
    setFilters((current) => [
      ...current.filter((filter) => filter.id !== propertyId),
      { id: propertyId, label: property.label, value: option.label },
    ]);
  }

  return (
    <div className="docs-collection-view">
      <div className="docs-collection-controls">
        <FilterBar
          filters={filters}
          onRemove={(id) =>
            setFilters((current) =>
              current.filter((filter) => filter.id !== id),
            )
          }
          onClear={() => setFilters([])}
        />
        <div className="docs-collection-actions">
          <FilterPicker properties={filterProperties} onAddFilter={addFilter} />
          <ViewOptions
            grouping={{
              value: grouping,
              options: [
                { value: "none", label: "No grouping" },
                { value: "status", label: "Status" },
                { value: "team", label: "Team" },
              ],
              onValueChange: setGrouping,
            }}
            ordering={{
              value: ordering,
              options: [
                { value: "updated", label: "Last updated" },
                { value: "title", label: "Title" },
              ],
              onValueChange: updateOrdering,
            }}
            density={density}
            onDensityChange={setDensity}
            columns={[
              { id: "id", label: "Issue ID", visible: true, disabled: true },
              { id: "title", label: "Title", visible: true, disabled: true },
              {
                id: "team",
                label: "Team",
                visible: columnVisibility.team !== false,
              },
              {
                id: "updated",
                label: "Updated",
                visible: columnVisibility.updated !== false,
              },
            ]}
            onColumnVisibilityChange={(id, visible) =>
              setColumnVisibility((current) => ({ ...current, [id]: visible }))
            }
            onReset={() => {
              setGrouping("status");
              updateOrdering("updated");
              setDensity("compact");
              setColumnVisibility({});
            }}
          />
        </div>
      </div>
      <DataTable
        aria-label="Issues"
        columns={columns}
        data={issues}
        getRowId={(issue) => issue.id}
        density={density}
        groupBy={
          grouping === "status"
            ? (issue) => ({
                id: issue.status,
                label: statusLabels[issue.status],
              })
            : grouping === "team"
              ? (issue) => ({ id: issue.team, label: issue.team })
              : undefined
        }
        columnPinning={{ start: ["id"], end: ["updated"] }}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        sorting={sorting}
        onSortingChange={setSorting}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        selectable
        showHeader={false}
        renderRowActions={(issue) => (
          <IconButton label={`More actions for ${issue.id}`} size="sm">
            <EllipsisHorizontalIcon width={16} height={16} />
          </IconButton>
        )}
        style={{ maxHeight: "24rem" }}
      />
      <MultiSelectToolbar
        selectedCount={selectedCount}
        itemLabel="issue"
        onClear={() => setRowSelection({})}
      >
        <Button size="sm" variant="ghost">
          <ArchiveBoxIcon width={16} height={16} aria-hidden="true" />
          Archive
        </Button>
      </MultiSelectToolbar>
    </div>
  );
}

function IssueTable({
  data = issues,
  showHeader = false,
}: {
  data?: Issue[];
  showHeader?: boolean;
}) {
  return (
    <DataTable
      aria-label="Issues"
      columns={columns}
      data={data}
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
      lead="A high-density collection foundation with sorting, selection, grouping, pinning, resizing, keyboard navigation, and contextual row actions."
      toc={toc}
    >
      <Section id="collection-view" title="Collection view">
        <p>
          Compose the table with filters, display settings, and bulk actions to
          build a complete issue view. The collection state remains controlled,
          so it can be stored in a URL, workspace preference, or saved view.
        </p>
        <Demo
          layout="start"
          code={`<FilterBar filters={filters} onRemove={removeFilter} />
<div className="collection-actions">
  <FilterPicker properties={filterProperties} onAddFilter={addFilter} />
  <ViewOptions
    grouping={grouping}
    ordering={ordering}
    density={density}
    columns={visibleColumns}
  />
</div>
<DataTable
  aria-label="Issues"
  columns={columns}
  data={issues}
  groupBy={(issue) => ({ id: issue.status, label: issue.status })}
  columnPinning={{ start: ["id"], end: ["updated"] }}
  rowSelection={rowSelection}
  onRowSelectionChange={setRowSelection}
  renderRowActions={(issue) => <IssueActions issue={issue} />}
  selectable
  showHeader={false}
/>
<MultiSelectToolbar selectedCount={selectedCount} onClear={clearSelection} />`}
        >
          <CollectionView />
        </Demo>
      </Section>

      <Section id="states" title="States">
        <p>
          Loading keeps the table geometry stable. Empty results get one calm
          message instead of a large illustration or promotional copy.
        </p>
        <div className="docs-data-table-states">
          <figure className="docs-data-table-state">
            <figcaption>Loading</figcaption>
            <DataTable
              aria-label="Loading issues"
              columns={columns}
              data={[]}
              loading
              loadingRows={2}
              showHeader={false}
            />
          </figure>
          <figure className="docs-data-table-state">
            <figcaption>Empty result</figcaption>
            <DataTable
              aria-label="Empty issues"
              columns={columns}
              data={[]}
              emptyTitle="No matching issues"
              emptyDescription="Try a different filter."
              showHeader={false}
            />
          </figure>
        </div>
      </Section>

      <Section id="behavior" title="Behavior">
        <p>
          Show the header to expose sorting and column resizing. Rows support
          Arrow, Home, End, Space, Enter, and Shift-range selection. Resize with
          the pointer or Arrow keys, then double click the handle to restore its
          original width.
        </p>
        <div className="docs-data-table-mode">
          <div className="docs-data-table-mode-heading">
            <span>Table mode</span>
            <span>Sortable and resizable columns</span>
          </div>
          <IssueTable data={issues.slice(0, 3)} showHeader />
        </div>
      </Section>
    </DocsPage>
  );
}
