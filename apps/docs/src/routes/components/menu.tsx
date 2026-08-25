import { createFileRoute } from "@tanstack/react-router";
import { Button, Menu } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/menu")({
  component: MenuDocs,
});

const toc = [
  { id: "anatomy", title: "Anatomy" },
  { id: "selection", title: "Checks and radio choices" },
  { id: "groups", title: "Groups and separators" },
];

function MenuDocs() {
  return (
    <DocsPage
      title="Menu"
      lead="A compact action surface with groups, shortcuts, selection, nested menus, keyboard navigation, and typeahead."
      toc={toc}
    >
      <Section id="anatomy" title="Anatomy">
        <p>
          The highlighted item is styled through <code>data-highlighted</code>{" "}
          rather than <code>:hover</code>, so the mouse and the keyboard produce
          exactly the same state. Arrow down and hover cannot disagree.
        </p>
        <Demo
          layout="start"
          code={`import { Button, Menu } from "@karnstack/dowel";

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

      <Section id="selection" title="Checks and radio choices">
        <p>
          Checkbox items toggle independent settings. Radio items choose one
          value from a group. Indicators occupy the same leading slot as
          Menu.Icon, while Menu.Shortcut aligns supporting keys at the far edge.
        </p>
        <Demo
          layout="start"
          code={`<Menu.Popup>
  <Menu.CheckboxItem defaultChecked>
    <Menu.CheckboxItemIndicator>✓</Menu.CheckboxItemIndicator>
    Show archived
    <Menu.Shortcut>⇧ A</Menu.Shortcut>
  </Menu.CheckboxItem>
  <Menu.Separator />
  <Menu.RadioGroup defaultValue="compact">
    <Menu.RadioItem value="compact">
      <Menu.RadioItemIndicator>•</Menu.RadioItemIndicator>
      Compact
    </Menu.RadioItem>
    <Menu.RadioItem value="comfortable">Comfortable</Menu.RadioItem>
  </Menu.RadioGroup>
  <Menu.Separator />
  <Menu.Item tone="danger">Delete project</Menu.Item>
</Menu.Popup>`}
        >
          <Menu.Root>
            <Menu.Trigger render={<Button>View options</Button>} />
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.CheckboxItem defaultChecked>
                    <Menu.CheckboxItemIndicator>✓</Menu.CheckboxItemIndicator>
                    Show archived
                    <Menu.Shortcut>⇧ A</Menu.Shortcut>
                  </Menu.CheckboxItem>
                  <Menu.Separator />
                  <Menu.RadioGroup defaultValue="compact">
                    <Menu.RadioItem value="compact">
                      <Menu.RadioItemIndicator>•</Menu.RadioItemIndicator>
                      Compact
                    </Menu.RadioItem>
                    <Menu.RadioItem value="comfortable">
                      Comfortable
                    </Menu.RadioItem>
                  </Menu.RadioGroup>
                  <Menu.Separator />
                  <Menu.Item tone="danger">Delete project</Menu.Item>
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
          the other. A labelled group that also has a rule above it is saying
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
