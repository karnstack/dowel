import { createFileRoute } from "@tanstack/react-router";
import { Button, Drawer } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/drawer")({
  component: DrawerDocs,
});

function DrawerExample() {
  return (
    <Drawer.Root side="right">
      <Drawer.Trigger render={<Button>Open repository details</Button>} />
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Repository details</Drawer.Title>
                <Drawer.Description>
                  Metadata and access for dowel.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Body>Default branch: main</Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close render={<Button>Close</Button>} />
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function DrawerDocs() {
  return (
    <DocsPage
      title="Drawer"
      lead="A swipe-dismissable edge panel for narrow navigation and temporary detail."
      toc={[
        { id: "default", title: "Side drawer" },
        { id: "sides", title: "Sides and gestures" },
      ]}
    >
      <Section id="default" title="Side drawer">
        <Demo
          code={`<Drawer.Root side="right">\n  <Drawer.Trigger render={<Button>Open details</Button>} />\n  <Drawer.Portal>\n    <Drawer.Backdrop />\n    <Drawer.Viewport>\n      <Drawer.Popup>…</Drawer.Popup>\n    </Drawer.Viewport>\n  </Drawer.Portal>\n</Drawer.Root>`}
        >
          <DrawerExample />
        </Demo>
      </Section>
      <Section id="sides" title="Sides and gestures">
        <p>
          Top, right, bottom, and left placement each map to the matching
          swipe-dismiss gesture. Use Dialog when gesture dismissal and edge
          attachment are unnecessary.
        </p>
      </Section>
    </DocsPage>
  );
}
