import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import {
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Callout,
  Checkbox,
  CheckboxGroup,
  Composer,
  DataTable,
  Dialog,
  EmptyState,
  Field,
  IconButton,
  Input,
  Kbd,
  Menu,
  NativeSelect,
  Popover,
  PropertyPicker,
  PropertyPill,
  RadioGroup,
  SearchField,
  Separator,
  Select,
  Sidebar,
  Skeleton,
  Spinner,
  Status,
  Switch,
  Tabs,
  Textarea,
  Tooltip,
  createDataTableColumnHelper,
} from "@karnstack/dowel";
import type { ReactNode } from "react";

import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  MenuIcon,
  SearchIcon,
} from "./icons";

type GalleryItemProps = {
  title: string;
  to: LinkProps["to"];
  children: ReactNode;
  layout?: "row" | "stack" | "wide";
};

const statusOptions = [
  { value: "triage", label: "Triage", group: "Active" },
  { value: "started", label: "In progress", group: "Active" },
  { value: "done", label: "Done", group: "Closed" },
];

const avatarPhoto =
  "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&crop=faces&fit=crop&h=96&q=80&w=96";

type GalleryIssue = { id: string; title: string; updated: string };
const tableColumn = createDataTableColumnHelper<GalleryIssue>();
const tableColumns = tableColumn.columns([
  tableColumn.accessor("id", {
    header: "Issue",
    size: 84,
    meta: { mono: true, tone: "tertiary" },
  }),
  tableColumn.accessor("title", {
    header: "Title",
    size: 280,
    meta: { grow: true },
  }),
  tableColumn.accessor("updated", {
    header: "Updated",
    size: 76,
    meta: { align: "end", tone: "tertiary" },
  }),
]);
const tableIssues: GalleryIssue[] = [
  { id: "ACM-318", title: "Refine keyboard navigation", updated: "Today" },
  { id: "ACM-294", title: "Add usage summary", updated: "Yesterday" },
  { id: "ACM-271", title: "Reduce dashboard render time", updated: "Aug 21" },
];

function GalleryItem({
  title,
  to,
  children,
  layout = "row",
}: GalleryItemProps) {
  return (
    <li className="docs-gallery-item" data-layout={layout}>
      <Link className="docs-gallery-link" to={to}>
        {title}
        <ArrowRightIcon />
      </Link>
      <div className="docs-gallery-preview">{children}</div>
    </li>
  );
}

export function ComponentGallery() {
  return (
    <section className="docs-gallery" aria-label="Live component catalog">
      <ul className="docs-gallery-grid" role="list">
        <GalleryItem title="Alert Dialog" to="/components/alert-dialog">
          <AlertDialog.Root>
            <AlertDialog.Trigger
              render={<Button variant="danger">Delete</Button>}
            />
            <AlertDialog.Portal>
              <AlertDialog.Backdrop />
              <AlertDialog.Popup>
                <AlertDialog.Header>
                  <AlertDialog.Title>Delete repository?</AlertDialog.Title>
                  <AlertDialog.Description>
                    This action cannot be undone.
                  </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                  <AlertDialog.Close render={<Button>Cancel</Button>} />
                  <AlertDialog.Close
                    render={<Button variant="danger">Delete</Button>}
                  />
                </AlertDialog.Footer>
              </AlertDialog.Popup>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </GalleryItem>

        <GalleryItem title="Avatar" to="/components/avatar">
          <Avatar name="Maya Chen" src={avatarPhoto} status="online" />
          <Avatar name="Grace Hopper" status="away" />
          <Avatar name="Lin Chen" shape="square" />
        </GalleryItem>

        <GalleryItem title="Button" to="/components/button">
          <Button variant="primary">Create</Button>
          <Button>Cancel</Button>
          <Button variant="ghost">More</Button>
        </GalleryItem>

        <GalleryItem title="Callout" to="/components/callout" layout="stack">
          <Callout title="Protected branch" tone="warning">
            Two approvals are required before merging.
          </Callout>
        </GalleryItem>

        <GalleryItem title="Badge" to="/components/badge">
          <Badge dot tone="accent">
            Beta
          </Badge>
          <Badge dot tone="success">
            Active
          </Badge>
          <Badge dot>Draft</Badge>
        </GalleryItem>

        <GalleryItem title="Status" to="/components/status">
          <Status tone="success">Passed</Status>
          <Status tone="warning">Degraded</Status>
          <Status tone="danger">Failed</Status>
        </GalleryItem>

        <GalleryItem title="Input" to="/components/input" layout="stack">
          <Field.Root>
            <Field.Label>Project name</Field.Label>
            <Input name="project" defaultValue="New workspace" />
          </Field.Root>
        </GalleryItem>

        <GalleryItem
          title="Search Field"
          to="/components/search-field"
          layout="stack"
        >
          <SearchField
            aria-label="Search repositories"
            placeholder="Search repositories"
            shortcut={<Kbd keys={["Meta", "K"]} />}
          />
        </GalleryItem>

        <GalleryItem
          title="Native Select"
          to="/components/native-select"
          layout="stack"
        >
          <NativeSelect aria-label="Default branch" defaultValue="main">
            <option value="main">main</option>
            <option value="develop">develop</option>
          </NativeSelect>
        </GalleryItem>

        <GalleryItem title="Select" to="/components/select" layout="stack">
          <Select
            label="Git provider"
            options={[
              { value: "github", label: "GitHub" },
              { value: "gitlab", label: "GitLab" },
            ]}
            defaultValue="github"
          />
        </GalleryItem>

        <GalleryItem title="Textarea" to="/components/input" layout="stack">
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea
              name="description"
              defaultValue="A compact interface for focused work."
              rows={2}
            />
          </Field.Root>
        </GalleryItem>

        <GalleryItem title="Checkbox" to="/components/checkbox" layout="stack">
          <CheckboxGroup defaultValue={["checks"]}>
            <label className="docs-choice-label">
              <Checkbox value="checks" /> Required checks
            </label>
            <label className="docs-choice-label">
              <Checkbox value="reviews" /> Required reviews
            </label>
          </CheckboxGroup>
        </GalleryItem>

        <GalleryItem
          title="Radio Group"
          to="/components/radio-group"
          layout="stack"
        >
          <RadioGroup.Root
            aria-label="Visibility preview"
            defaultValue="private"
          >
            <label className="docs-choice-label">
              <RadioGroup.Item value="private" /> Private
            </label>
            <label className="docs-choice-label">
              <RadioGroup.Item value="public" /> Public
            </label>
          </RadioGroup.Root>
        </GalleryItem>

        <GalleryItem title="Switch" to="/components/switch">
          <label className="docs-choice-label">
            <Switch defaultChecked /> Mirror repository
          </label>
        </GalleryItem>

        <GalleryItem title="Property Picker" to="/components/property-picker">
          <PropertyPicker
            label="Status"
            options={statusOptions}
            defaultValue="started"
          />
        </GalleryItem>

        <GalleryItem title="Menu" to="/components/menu">
          <Menu.Root>
            <Menu.Trigger render={<Button>View options</Button>} />
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Item>List</Menu.Item>
                  <Menu.Item>Board</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Display settings</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </GalleryItem>

        <GalleryItem title="Dialog" to="/components/dialog">
          <Dialog.Root>
            <Dialog.Trigger render={<Button>New project</Button>} />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Header>
                  <Dialog.Title>New project</Dialog.Title>
                  <Dialog.Description>
                    Give the project a clear, short name.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input name="name" placeholder="Project name" />
                  </Field.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close render={<Button>Cancel</Button>} />
                  <Dialog.Close
                    render={<Button variant="primary">Create</Button>}
                  />
                </Dialog.Footer>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </GalleryItem>

        <GalleryItem title="Popover" to="/components/popover">
          <Popover.Root>
            <Popover.Trigger render={<Button>Repository access</Button>} />
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup>
                  <Popover.Arrow />
                  <Popover.Title>Repository access</Popover.Title>
                  <Popover.Description>
                    Visible to organization members.
                  </Popover.Description>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </GalleryItem>

        <GalleryItem title="Icon Button" to="/components/icon-button">
          <IconButton label="Copy">
            <CopyIcon />
          </IconButton>
          <IconButton label="Confirm" variant="secondary">
            <CheckIcon />
          </IconButton>
          <IconButton label="More" variant="ghost">
            <MenuIcon />
          </IconButton>
        </GalleryItem>

        <GalleryItem title="Tooltip" to="/components/tooltip">
          <Tooltip.Root>
            <Tooltip.Trigger
              render={
                <IconButton label="Copy link">
                  <CopyIcon />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Copy link</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </GalleryItem>

        <GalleryItem title="Kbd" to="/components/kbd">
          <Kbd keys={["Meta", "K"]} />
          <Kbd keys={["Shift", "P"]} />
        </GalleryItem>

        <GalleryItem
          title="Separator"
          to="/components/separator"
          layout="stack"
        >
          <Status tone="success">Checks passed</Status>
          <Separator />
          <Status>Updated two minutes ago</Status>
        </GalleryItem>

        <GalleryItem title="Spinner" to="/components/spinner">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
        </GalleryItem>

        <GalleryItem title="Skeleton" to="/components/skeleton" layout="stack">
          <Skeleton />
          <Skeleton size="sm" />
          <Skeleton variant="block" size="sm" />
        </GalleryItem>

        <GalleryItem
          title="Empty State"
          to="/components/empty-state"
          layout="wide"
        >
          <EmptyState
            size="compact"
            icon={<SearchIcon />}
            title="No matching repositories"
            description="Try a different name or clear the active filters."
            actions={<Button size="sm">Clear filters</Button>}
          />
        </GalleryItem>

        <GalleryItem title="Tabs" to="/components/tabs" layout="stack">
          <Tabs.Root defaultValue="assigned">
            <Tabs.List aria-label="Issue views">
              <Tabs.Tab value="assigned">Assigned</Tabs.Tab>
              <Tabs.Tab value="created">Created</Tabs.Tab>
              <Tabs.Tab value="activity">Activity</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="assigned">Assigned issues</Tabs.Panel>
            <Tabs.Panel value="created">Created issues</Tabs.Panel>
            <Tabs.Panel value="activity">Recent activity</Tabs.Panel>
          </Tabs.Root>
        </GalleryItem>

        <GalleryItem title="Sidebar" to="/components/sidebar">
          <Sidebar.Root
            className="docs-gallery-sidebar"
            defaultWidth={104}
            minWidth={88}
            maxWidth={136}
          >
            <Sidebar.Panel aria-label="Sidebar preview">
              <Sidebar.Body>
                <span className="docs-gallery-sidebar-title">Workspace</span>
                <span data-active="">Inbox</span>
                <span>Projects</span>
              </Sidebar.Body>
            </Sidebar.Panel>
            <Sidebar.ResizeHandle aria-label="Resize sidebar preview" />
            <Sidebar.Content>
              <div className="docs-gallery-sidebar-lines">
                <span />
                <span />
                <span />
              </div>
            </Sidebar.Content>
          </Sidebar.Root>
        </GalleryItem>

        <GalleryItem
          title="Data Table"
          to="/components/data-table"
          layout="wide"
        >
          <DataTable
            aria-label="Issue table preview"
            columns={tableColumns}
            data={tableIssues}
            getRowId={(issue) => issue.id}
            selectable
            showHeader={false}
          />
        </GalleryItem>

        <GalleryItem title="Composer" to="/components/composer" layout="wide">
          <Composer.Root
            aria-label="Create issue example"
            onSubmit={(event) => event.preventDefault()}
          >
            <Composer.Body>
              <Composer.Title name="title" placeholder="Add title" />
              <Composer.Description
                name="description"
                placeholder="Add a description"
              />
            </Composer.Body>
            <Composer.Properties>
              <PropertyPill label="Triage" active />
              <PropertyPill label="Priority" />
              <PropertyPill label="Assignee" />
            </Composer.Properties>
            <Composer.Footer>
              <PropertyPill label="More actions" />
              <Composer.Actions>
                <Button type="submit" variant="primary">
                  Create issue
                </Button>
              </Composer.Actions>
            </Composer.Footer>
          </Composer.Root>
        </GalleryItem>
      </ul>
    </section>
  );
}
