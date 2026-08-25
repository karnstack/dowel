import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Composer,
  Dialog,
  Field,
  IconButton,
  Input,
  Kbd,
  Menu,
  PropertyPicker,
  PropertyPill,
  Sidebar,
  Tooltip,
} from "dowel";
import type { ReactNode } from "react";

import { ArrowRightIcon, CheckIcon, CopyIcon, MenuIcon } from "./icons";

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
        <ArrowRightIcon size={14} />
      </Link>
      <div className="docs-gallery-preview">{children}</div>
    </li>
  );
}

export function ComponentGallery() {
  return (
    <section className="docs-gallery" aria-labelledby="components-title">
      <div className="docs-gallery-heading">
        <h2 id="components-title">Components</h2>
        <p>Live, interactive, and shown in the current theme.</p>
      </div>

      <ul className="docs-gallery-grid" role="list">
        <GalleryItem title="Button" to="/components/button">
          <Button variant="primary">Create</Button>
          <Button>Cancel</Button>
          <Button variant="ghost">More</Button>
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

        <GalleryItem title="Input" to="/components/input" layout="stack">
          <Field.Root>
            <Field.Label>Project name</Field.Label>
            <Input name="project" defaultValue="New workspace" />
          </Field.Root>
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
