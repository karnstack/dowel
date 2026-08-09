import { createFileRoute } from "@tanstack/react-router";
import { Button, Dialog, Field, Input } from "dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/dialog")({
  component: DialogDocs,
});

const toc = [
  { id: "anatomy", title: "Anatomy" },
  { id: "with-a-form", title: "With a form" },
];

function DialogDocs() {
  return (
    <DocsPage
      title="Dialog"
      lead="A modal on the modal elevation tier. Title labels the dialog for assistive tech automatically — there is no hand-rolled aria-labelledby."
      toc={toc}
    >
      <Section id="anatomy" title="Anatomy">
        <p>
          Compose <code>Root</code>, <code>Trigger</code>, <code>Portal</code>,{" "}
          <code>Backdrop</code>, <code>Popup</code>, <code>Title</code>,{" "}
          <code>Description</code> and <code>Close</code>. Focus trapping,
          scroll locking and Escape handling come from Base UI.
        </p>
        <Demo
          layout="start"
          code={`import { Button, Dialog } from "dowel";

<Dialog.Root>
  <Dialog.Trigger render={<Button>Delete workspace</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Delete workspace</Dialog.Title>
      <Dialog.Description>
        This removes every project in it. It cannot be undone.
      </Dialog.Description>
      <Dialog.Close render={<Button>Cancel</Button>} />
      <Dialog.Close render={<Button variant="danger">Delete</Button>} />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`}
        >
          <Dialog.Root>
            <Dialog.Trigger render={<Button>Delete workspace</Button>} />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Title>Delete workspace</Dialog.Title>
                <Dialog.Description>
                  This removes every project in it. It cannot be undone.
                </Dialog.Description>
                <div className="docs-dialog-actions">
                  <Dialog.Close render={<Button>Cancel</Button>} />
                  <Dialog.Close
                    render={<Button variant="danger">Delete</Button>}
                  />
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </Demo>
        <p className="docs-note">
          <code>Dialog.Portal</code> renders a plain <code>div</code>. Never put
          an inline <code>transform</code> or <code>filter</code> on it — either
          one creates a containing block and silently breaks the popup&apos;s{" "}
          <code>position: fixed</code>.
        </p>
      </Section>

      <Section id="with-a-form" title="With a form">
        <p>
          The popup is a flex column with a fixed gap, so a field stack drops
          straight in without a wrapper.
        </p>
        <Demo
          layout="start"
          code={`<Dialog.Popup>
  <Dialog.Title>New project</Dialog.Title>
  <Field.Root>
    <Field.Label>Name</Field.Label>
    <Input placeholder="dowel" />
  </Field.Root>
  <Dialog.Close render={<Button variant="primary">Create</Button>} />
</Dialog.Popup>`}
        >
          <Dialog.Root>
            <Dialog.Trigger
              render={<Button variant="primary">New project</Button>}
            />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Title>New project</Dialog.Title>
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input placeholder="dowel" />
                </Field.Root>
                <div className="docs-dialog-actions">
                  <Dialog.Close render={<Button>Cancel</Button>} />
                  <Dialog.Close
                    render={<Button variant="primary">Create</Button>}
                  />
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
