import { createFileRoute } from "@tanstack/react-router";
import { Button, IconButton } from "dowel";

export const Route = createFileRoute("/components/button")({
  component: ButtonDocs,
});

function ButtonDocs() {
  return (
    <main className="docs-main">
      <h1>Button</h1>
      <p>
        The default control. Four variants, two sizes, and no appearance props —{" "}
        <code>className</code> and <code>style</code> are omitted from the type
        and neutralised at runtime.
      </p>

      <h2>Variants</h2>
      <div className="docs-row">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <h2>Sizes and states</h2>
      <div className="docs-row">
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button disabled>Disabled</Button>
      </div>

      <h2>IconButton</h2>
      <p>
        For a control whose content is an icon. <code>label</code> is required —
        an icon alone never names a control, so the accessible name is part of
        the API rather than something a caller can forget.
      </p>
      <div className="docs-row">
        <IconButton label="Close">×</IconButton>
        <IconButton label="Add" variant="secondary">
          +
        </IconButton>
      </div>
    </main>
  );
}
