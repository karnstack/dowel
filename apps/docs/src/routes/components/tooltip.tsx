import { createFileRoute } from "@tanstack/react-router";
import { IconButton, Tooltip } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";
import { CheckIcon, CopyIcon, MenuIcon } from "../../components/icons";

export const Route = createFileRoute("/components/tooltip")({
  component: TooltipDocs,
});

const toc = [
  { id: "anatomy", title: "Anatomy" },
  { id: "shared-delay", title: "The shared delay" },
  { id: "visual-only", title: "A tooltip is a visual label only" },
];

function TooltipDocs() {
  return (
    <DocsPage
      title="Tooltip"
      lead="A hover and focus label on the popover elevation tier. Open timing, hover intent and focus-visible handling come from Base UI."
      toc={toc}
    >
      <Section id="anatomy" title="Anatomy">
        <p>
          Compose <code>Root</code>, <code>Trigger</code>, <code>Portal</code>,{" "}
          <code>Positioner</code> and <code>Popup</code>. The positioner
          defaults to a 6px <code>sideOffset</code>.
        </p>
        <Demo
          layout="start"
          code={`import { IconButton, Tooltip } from "@karnstack/dowel";

<Tooltip.Root>
  <Tooltip.Trigger
    render={<IconButton label="Copy link"><CopyIcon /></IconButton>}
  />
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Copy link</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
        >
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
        </Demo>
      </Section>

      <Section id="shared-delay" title="The shared delay">
        <p>
          A single <code>Tooltip.Provider</code> at the app root is what lets
          adjacent tooltips share one delay: the first waits, and the next one
          the pointer reaches opens instantly instead of waiting again. Hover
          across this row to feel it.
        </p>
        <Demo
          code={`// once, at the root of the app
<Tooltip.Provider>
  <App />
</Tooltip.Provider>`}
        >
          {[
            { label: "Copy", icon: <CopyIcon /> },
            { label: "Confirm", icon: <CheckIcon /> },
            { label: "More", icon: <MenuIcon /> },
          ].map((t) => (
            <Tooltip.Root key={t.label}>
              <Tooltip.Trigger
                render={
                  <IconButton label={t.label} variant="secondary">
                    {t.icon}
                  </IconButton>
                }
              />
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>{t.label}</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          ))}
        </Demo>
      </Section>

      <Section id="visual-only" title="A tooltip is a visual label only">
        <p className="docs-note">
          Base UI, which dowel builds on, deliberately does not associate the
          popup with its trigger — there is no <code>aria-describedby</code> and
          no touch affordance. So the tooltip text does not reach a screen
          reader, and the trigger has to carry its own accessible name.{" "}
          <code>IconButton</code> enforces exactly that with its required{" "}
          <code>label</code> prop, which is why every example above wraps one.
          If the hover content is information a user cannot do without, it does
          not belong in a Tooltip — reach for a Popover, which is announced.
        </p>
      </Section>
    </DocsPage>
  );
}
