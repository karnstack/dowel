import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Composer,
  Dialog,
  Field,
  Input,
  PropertyPill,
} from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/dialog")({
  component: DialogDocs,
});

const toc = [
  { id: "anatomy", title: "Anatomy" },
  { id: "with-a-form", title: "With a form" },
  { id: "with-a-composer", title: "With a composer" },
];

function DialogDocs() {
  return (
    <DocsPage
      title="Dialog"
      lead="A modal shell with focus trapping, deliberate content regions, and a bare host for larger product composites."
      toc={toc}
    >
      <Section id="anatomy" title="Anatomy">
        <p>
          Header, Body, and Footer provide the spacing contract. Title labels
          the dialog automatically. Focus trapping, scroll locking, focus
          return, and Escape handling come from Base UI.
        </p>
        <Demo
          layout="start"
          code={`import { Button, Dialog } from "@karnstack/dowel";

<Dialog.Root>
  <Dialog.Trigger render={<Button>Delete workspace</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Header>
        <Dialog.Title>Delete workspace</Dialog.Title>
        <Dialog.Description>
          This removes every project in it. It cannot be undone.
        </Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close render={<Button>Cancel</Button>} />
        <Dialog.Close render={<Button variant="danger">Delete</Button>} />
      </Dialog.Footer>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`}
        >
          <Dialog.Root>
            <Dialog.Trigger render={<Button>Delete workspace</Button>} />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Header>
                  <Dialog.Title>Delete workspace</Dialog.Title>
                  <Dialog.Description>
                    This removes every project in it. It cannot be undone.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close render={<Button>Cancel</Button>} />
                  <Dialog.Close
                    render={<Button variant="danger">Delete</Button>}
                  />
                </Dialog.Footer>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </Demo>
        <p className="docs-note">
          <code>Dialog.Portal</code> renders a plain <code>div</code>. Never put
          an inline <code>transform</code> or <code>filter</code> on it. Either
          one creates a containing block and breaks the popup&apos;s fixed
          positioning.
        </p>
      </Section>

      <Section id="with-a-form" title="With a form">
        <p>
          Put controls in Body and actions in Footer. The regions keep spacing
          and dividers consistent across every small modal.
        </p>
        <Demo
          layout="start"
          code={`<Dialog.Popup>
  <Dialog.Header>
    <Dialog.Title>New project</Dialog.Title>
  </Dialog.Header>
  <Dialog.Body>
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Input placeholder="dowel" />
    </Field.Root>
  </Dialog.Body>
  <Dialog.Footer>
    <Dialog.Close render={<Button>Cancel</Button>} />
    <Button variant="primary">Create</Button>
  </Dialog.Footer>
</Dialog.Popup>`}
        >
          <Dialog.Root>
            <Dialog.Trigger
              render={<Button variant="primary">New project</Button>}
            />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Header>
                  <Dialog.Title>New project</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input placeholder="dowel" />
                  </Field.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close render={<Button>Cancel</Button>} />
                  <Button variant="primary">Create</Button>
                </Dialog.Footer>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </Demo>
      </Section>

      <Section id="with-a-composer" title="With a composer">
        <p>
          Use the bare popup when a product composite already owns its surface.
          Dialog still owns modal behavior and Composer owns the creation
          experience.
        </p>
        <Demo
          layout="start"
          code={`<Dialog.Root>
  <Dialog.Trigger render={<Button>New work item</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup variant="bare" aria-label="Create work item">
      <Composer.Root onSubmit={createItem}>
        <Composer.Body>
          <Composer.Title name="title" placeholder="Add title" />
          <Composer.Description
            name="description"
            placeholder="Add a description"
          />
        </Composer.Body>
        <Composer.Properties>
          <PropertyPill label="Triage" />
          <PropertyPill label="Assignee" />
        </Composer.Properties>
        <Composer.Footer>
          <Composer.Actions>
            <Button variant="primary" type="submit">Create item</Button>
          </Composer.Actions>
        </Composer.Footer>
      </Composer.Root>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`}
        >
          <Dialog.Root>
            <Dialog.Trigger render={<Button>New work item</Button>} />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup variant="bare" aria-label="Create work item">
                <Composer.Root
                  onSubmit={(event) => event.preventDefault()}
                  aria-label="Create work item form"
                >
                  <Composer.Body>
                    <Composer.Title name="title" placeholder="Add title" />
                    <Composer.Description
                      name="description"
                      placeholder="Add a description"
                    />
                  </Composer.Body>
                  <Composer.Properties>
                    <PropertyPill label="Triage" />
                    <PropertyPill label="Assignee" />
                  </Composer.Properties>
                  <Composer.Footer>
                    <Composer.Actions>
                      <Button variant="primary" type="submit">
                        Create item
                      </Button>
                    </Composer.Actions>
                  </Composer.Footer>
                </Composer.Root>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
