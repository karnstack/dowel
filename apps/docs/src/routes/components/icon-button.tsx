import { createFileRoute } from "@tanstack/react-router";
import { IconButton, Tooltip } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";
import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  MenuIcon,
} from "../../components/icons";

export const Route = createFileRoute("/components/icon-button")({
  component: IconButtonDocs,
});

const toc = [
  { id: "label", title: "The label is required" },
  { id: "variants", title: "Variants and sizes" },
  { id: "with-a-tooltip", title: "With a tooltip" },
];

function IconButtonDocs() {
  return (
    <DocsPage
      title="Icon Button"
      lead="A square control whose content is an icon. The accessible name is part of the API rather than something a caller can forget."
      toc={toc}
    >
      <Section id="label" title="The label is required">
        <p>
          An icon alone never names a control, so <code>label</code> is a
          required prop and <code>aria-label</code> is omitted from the type.
          There is no way to render one of these without a name.
        </p>
        <Demo
          code={`import { IconButton } from "@karnstack/dowel";

<IconButton label="Close">
  <CloseIcon />
</IconButton>`}
        >
          <IconButton label="Close">
            <CloseIcon />
          </IconButton>
        </Demo>
      </Section>

      <Section id="variants" title="Variants and sizes">
        <p>
          Ghost by default, because these usually sit in a toolbar where a
          filled control would shout. <code>secondary</code> gives it a surface
          when it needs to read as a discrete target. <code>muted</code> and{" "}
          <code>danger</code> cover quiet emphasis and destructive actions.
        </p>
        <Demo
          code={`<IconButton label="Menu"><MenuIcon /></IconButton>
<IconButton label="Copy" variant="secondary"><CopyIcon /></IconButton>
<IconButton label="Confirm" variant="muted" size="sm">
  <CheckIcon />
</IconButton>
<IconButton label="Unavailable" variant="secondary" disabled>
  <CopyIcon />
</IconButton>`}
        >
          <IconButton label="Menu">
            <MenuIcon />
          </IconButton>
          <IconButton label="Copy" variant="secondary">
            <CopyIcon />
          </IconButton>
          <IconButton label="Confirm" variant="muted" size="sm">
            <CheckIcon size={14} />
          </IconButton>
          <IconButton label="Unavailable" variant="secondary" disabled>
            <CopyIcon />
          </IconButton>
        </Demo>
      </Section>

      <Section id="with-a-tooltip" title="With a tooltip">
        <p>
          A Tooltip is a visual label only — it is not announced. Pairing it
          with an IconButton is the supported combination precisely because the
          button already carries its own name.
        </p>
        <Demo
          layout="start"
          code={`<Tooltip.Root>
  <Tooltip.Trigger
    render={<IconButton label="Copy code"><CopyIcon /></IconButton>}
  />
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Copy code</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
        >
          <Tooltip.Root>
            <Tooltip.Trigger
              render={
                <IconButton label="Copy code">
                  <CopyIcon />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>Copy code</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
