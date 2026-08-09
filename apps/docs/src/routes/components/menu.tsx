import { createFileRoute } from "@tanstack/react-router";
import { Button, Menu } from "dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/menu")({
  component: MenuDocs,
});

const toc = [
  { id: "anatomy", title: "Anatomy" },
  { id: "groups", title: "Groups and separators" },
];

function MenuDocs() {
  return (
    <DocsPage
      title="Menu"
      lead="A dropdown on the popover elevation tier. Keyboard navigation, typeahead and highlight management come from Base UI."
      toc={toc}
    >
      <Section id="anatomy" title="Anatomy">
        <p>
          The highlighted item is styled through <code>data-highlighted</code>{" "}
          rather than <code>:hover</code>, so the mouse and the keyboard produce
          exactly the same state — arrow down and hover cannot disagree.
        </p>
        <Demo
          layout="start"
          code={`import { Button, Menu } from "dowel";

<Menu.Root>
  <Menu.Trigger render={<Button>Open menu</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Duplicate</Menu.Item>
        <Menu.Item>Rename</Menu.Item>
        <Menu.Item disabled>Move to…</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
        >
          <Menu.Root>
            <Menu.Trigger render={<Button>Open menu</Button>} />
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Item>Duplicate</Menu.Item>
                  <Menu.Item>Rename</Menu.Item>
                  <Menu.Item disabled>Move to…</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </Demo>
      </Section>

      <Section id="groups" title="Groups and separators">
        <p>
          <code>Group</code> and <code>GroupLabel</code> name a run of related
          items; <code>Separator</code> is the hairline between runs. Use one or
          the other — a labelled group that also has a rule above it is saying
          the same thing twice.
        </p>
        <Demo
          layout="start"
          code={`<Menu.Popup>
  <Menu.Group>
    <Menu.GroupLabel>This project</Menu.GroupLabel>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Item>Archive</Menu.Item>
  </Menu.Group>
  <Menu.Separator />
  <Menu.Item>Delete</Menu.Item>
</Menu.Popup>`}
        >
          <Menu.Root>
            <Menu.Trigger render={<Button>Actions</Button>} />
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Group>
                    <Menu.GroupLabel>This project</Menu.GroupLabel>
                    <Menu.Item>Duplicate</Menu.Item>
                    <Menu.Item>Archive</Menu.Item>
                  </Menu.Group>
                  <Menu.Separator />
                  <Menu.Item>Delete</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </Demo>
        <p className="docs-note">
          <code>Menu.Positioner</code> defaults to a 4px <code>sideOffset</code>
          . It is set before the prop spread, so it is a default you can
          override, not a mandate.
        </p>
      </Section>
    </DocsPage>
  );
}
