import { createFileRoute } from "@tanstack/react-router";
import { IconButton, Tooltip } from "dowel";

export const Route = createFileRoute("/components/tooltip")({
  component: TooltipDocs,
});

function TooltipDocs() {
  return (
    <main className="docs-main">
      <h1>Tooltip</h1>
      <p>
        A hover and focus label on the popover elevation tier. Compose{" "}
        <code>Root</code>, <code>Trigger</code>, <code>Portal</code>,{" "}
        <code>Positioner</code> and <code>Popup</code>, with a single{" "}
        <code>Tooltip.Provider</code> wrapping the app so adjacent tooltips
        share one delay and the second one opens instantly.
      </p>

      <div className="docs-row">
        <Tooltip.Root>
          <Tooltip.Trigger
            render={<IconButton label="Copy link">🔗</IconButton>}
          />
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Copy link</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>

      <h2>A tooltip is a visual label only</h2>
      <p className="docs-note">
        Base UI, which dowel builds on, deliberately does not associate the
        popup with its trigger — there is no <code>aria-describedby</code> and
        no touch affordance. So the tooltip text does not reach a screen reader,
        and the trigger has to carry its own accessible name.{" "}
        <code>IconButton</code> enforces exactly that with its required{" "}
        <code>label</code> prop, which is why the example above wraps one. If
        the hover content is information a user cannot do without, it does not
        belong in a Tooltip — reach for a Popover, which is announced.
      </p>
    </main>
  );
}
