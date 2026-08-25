import { createFileRoute } from "@tanstack/react-router";
import { Button, Popover, Status } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/popover")({
  component: PopoverDocs,
});

const toc = [
  { id: "anatomy", title: "Anatomy" },
  { id: "content", title: "Content and semantics" },
];

function PopoverDocs() {
  return (
    <DocsPage
      title="Popover"
      lead="An anchored surface for interactive controls and supporting details that must reach every user."
      toc={toc}
    >
      <Section id="anatomy" title="Anatomy">
        <p>
          Compose the trigger, portal, positioner, and popup. Add a title and
          description when the content needs an announced name and summary.
        </p>
        <Demo
          layout="start"
          code={`<Popover.Root>
  <Popover.Trigger render={<Button>Repository access</Button>} />
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Repository access</Popover.Title>
        <Popover.Description>
          Visible to organization members.
        </Popover.Description>
        <Status tone="success">Connected</Status>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
        >
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
                  <Status tone="success">Connected</Status>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </Demo>
      </Section>

      <Section id="content" title="Content and semantics">
        <p>
          Use Popover for information or controls that need focus, keyboard,
          touch, and screen-reader access. Use Tooltip only for a short visual
          label whose trigger is already independently named.
        </p>
      </Section>
    </DocsPage>
  );
}
