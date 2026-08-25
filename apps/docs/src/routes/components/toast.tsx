import { createFileRoute } from "@tanstack/react-router";
import { Button, ToastProvider, toast } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/toast")({
  component: ToastDocs,
});

function ToastDocs() {
  return (
    <DocsPage
      title="Toast"
      lead="A globally callable notification queue with tone, actions, promises, and swipe dismissal."
      toc={[
        { id: "global", title: "Global manager" },
        { id: "motion", title: "Stacking and motion" },
        { id: "guidance", title: "When to use" },
      ]}
    >
      <Section id="global" title="Global manager">
        <p>
          Mount one provider near the application root, then call toast from
          components or ordinary modules.
        </p>
        <Demo
          code={`<ToastProvider>\n  <App />\n</ToastProvider>\n\ntoast.success("Repository created", {\n  description: "dowel is ready",\n});`}
        >
          <ToastProvider>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Button
                onClick={() =>
                  toast.success("Repository created", {
                    description: "dowel is ready",
                  })
                }
              >
                Create toast
              </Button>
              <Button
                onClick={() => {
                  toast("Sync queued", { description: "Waiting for a slot" });
                  toast.info("Syncing repository", {
                    description: "Pulling the latest changes",
                  });
                  toast.success("Repository synced", {
                    description: "Everything is up to date",
                  });
                }}
              >
                Create stack
              </Button>
            </div>
          </ToastProvider>
        </Demo>
      </Section>
      <Section id="motion" title="Stacking and motion">
        <p>
          New notifications settle onto a compact stack. Hover or focus the
          viewport to expand it, and drag a toast down or right to dismiss it.
          Motion is reduced automatically when the operating system requests it.
        </p>
      </Section>
      <Section id="guidance" title="When to use">
        <p>
          Reserve toasts for transient, non-blocking results. Keep validation
          and pending state next to the action that produced them. F6 moves
          focus into the notification viewport.
        </p>
      </Section>
    </DocsPage>
  );
}
