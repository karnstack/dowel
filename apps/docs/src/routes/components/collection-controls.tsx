import {
  ArchiveBoxIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  FilterBar,
  FilterPicker,
  HoverActions,
  IconButton,
  MultiSelectToolbar,
  ViewOptions,
} from "@karnstack/dowel";
import type {
  DataTableDensity,
  FilterBarFilter,
  FilterPickerProperty,
} from "@karnstack/dowel";
import { useState } from "react";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/collection-controls")({
  component: CollectionControlsDocs,
});

const toc = [
  { id: "filters", title: "Filters and views" },
  { id: "selection", title: "Bulk selection" },
  { id: "row-actions", title: "Row actions" },
];

const initialFilters: FilterBarFilter[] = [
  { id: "status", label: "Status", value: "Active" },
  { id: "assignee", label: "Assignee", value: "Me" },
];

const filterProperties: FilterPickerProperty[] = [
  {
    id: "status",
    label: "Status",
    values: [
      { value: "active", label: "Active" },
      { value: "done", label: "Completed" },
    ],
  },
  {
    id: "assignee",
    label: "Assignee",
    values: [
      { value: "me", label: "Me" },
      { value: "unassigned", label: "Unassigned" },
    ],
  },
];

function CollectionControlsDocs() {
  const [filters, setFilters] = useState(initialFilters);
  const [density, setDensity] = useState<DataTableDensity>("compact");
  const [selectedCount, setSelectedCount] = useState(3);

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
    <DocsPage
      title="Collection Controls"
      lead="Composable controls for filtering, configuring, and acting on dense lists and tables."
      toc={toc}
    >
      <Section id="filters" title="Filters and views">
        <p>
          Keep active constraints visible and place display preferences at the
          collection edge. Both components are controlled, so saved views can
          own the same state.
        </p>
        <Demo
          layout="start"
          code={`<FilterBar filters={filters} onRemove={removeFilter} onClear={clearFilters} />
<div className="collection-actions">
  <FilterPicker properties={filterProperties} onAddFilter={addFilter} />
  <ViewOptions
    density={density}
    onDensityChange={setDensity}
    columns={columns}
    onColumnVisibilityChange={setColumnVisibility}
  />
</div>`}
        >
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
              <FilterPicker
                properties={filterProperties}
                onAddFilter={addFilter}
              />
              <ViewOptions
                density={density}
                onDensityChange={setDensity}
                columns={[
                  {
                    id: "title",
                    label: "Title",
                    visible: true,
                    disabled: true,
                  },
                  { id: "team", label: "Team", visible: true },
                  { id: "updated", label: "Updated", visible: false },
                ]}
                onColumnVisibilityChange={() => {}}
              />
            </div>
          </div>
        </Demo>
      </Section>

      <Section id="selection" title="Bulk selection">
        <p>
          The toolbar appears only while items are selected. Keep its actions
          specific to the selected set and always provide a way back to the
          unselected state.
        </p>
        <Demo
          layout="start"
          code={`<MultiSelectToolbar
  selectedCount={selectedCount}
  itemLabel="issue"
  onClear={clearSelection}
>
  <Button size="sm" variant="ghost">Archive</Button>
</MultiSelectToolbar>`}
        >
          <div className="docs-selection-demo">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setSelectedCount(3)}
            >
              Select 3 issues
            </Button>
            <MultiSelectToolbar
              selectedCount={selectedCount}
              itemLabel="issue"
              onClear={() => setSelectedCount(0)}
            >
              <Button size="sm" variant="ghost">
                <ArchiveBoxIcon width={16} height={16} aria-hidden="true" />
                Archive
              </Button>
            </MultiSelectToolbar>
          </div>
        </Demo>
      </Section>

      <Section id="row-actions" title="Row actions">
        <p>
          Hover actions reserve no visual attention until the row is hovered or
          focus moves inside it. Pass <code>visible</code> when a parent row
          tracks pointer state.
        </p>
        <Demo
          code={`<HoverActions visible>
  <IconButton label="More actions" size="sm">
    <EllipsisHorizontalIcon />
  </IconButton>
</HoverActions>`}
        >
          <HoverActions visible>
            <IconButton label="More actions" size="sm">
              <EllipsisHorizontalIcon width={16} height={16} />
            </IconButton>
          </HoverActions>
        </Demo>
      </Section>
    </DocsPage>
  );
}
