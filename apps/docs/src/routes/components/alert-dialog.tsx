import { createFileRoute } from "@tanstack/react-router";
import { AlertDialog, Button } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/alert-dialog")({
  component: AlertDialogDocs,
});

const toc = [
  { id: "confirmation", title: "Confirmation" },
  { id: "behavior", title: "Behavior" },
];

function AlertDialogDocs() {
  return (
    <DocsPage
      title="Alert Dialog"
      lead="A focused decision point for actions that are destructive, irreversible, or expensive to undo."
      toc={toc}
    >
      <Section id="confirmation" title="Confirmation">
        <p>
          Name the exact action in the title and destructive button. Keep the
          description factual, and make cancellation the quiet default path.
        </p>
        <Demo
          code={`<AlertDialog.Root>
  <AlertDialog.Trigger render={<Button variant="danger">Delete repository</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Header>
        <AlertDialog.Title>Delete repository?</AlertDialog.Title>
        <AlertDialog.Description>
          This permanently removes the repository and its settings.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Close render={<Button>Cancel</Button>} />
        <AlertDialog.Close render={<Button variant="danger">Delete repository</Button>} />
      </AlertDialog.Footer>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
        >
          <AlertDialog.Root>
            <AlertDialog.Trigger
              render={<Button variant="danger">Delete repository</Button>}
            />
            <AlertDialog.Portal>
              <AlertDialog.Backdrop />
              <AlertDialog.Popup>
                <AlertDialog.Header>
                  <AlertDialog.Title>Delete repository?</AlertDialog.Title>
                  <AlertDialog.Description>
                    This permanently removes the repository and its settings.
                  </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                  <AlertDialog.Close render={<Button>Cancel</Button>} />
                  <AlertDialog.Close
                    render={<Button variant="danger">Delete repository</Button>}
                  />
                </AlertDialog.Footer>
              </AlertDialog.Popup>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </Demo>
      </Section>

      <Section id="behavior" title="Behavior">
        <p>
          Opening traps focus and announces both title and description. Closing
          returns focus to the trigger. Use Dialog for ordinary tasks and forms;
          reserve Alert Dialog for a decision that requires explicit attention.
        </p>
      </Section>
    </DocsPage>
  );
}
