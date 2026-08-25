import { createFileRoute } from "@tanstack/react-router";

import { ComponentGallery } from "../../components/component-gallery";
import { componentNav } from "../../lib/nav";

export const Route = createFileRoute("/components/")({
  component: ComponentsIndex,
});

function ComponentsIndex() {
  return (
    <main className="docs-home docs-components-index">
      <header className="docs-intro">
        <div className="docs-intro-copy">
          <p className="docs-intro-meta">Library / {componentNav.length}</p>
          <h1>Components</h1>
          <p>Compact primitives for dense, keyboard-first interfaces.</p>
        </div>

        <div className="docs-install-command" aria-label="Install dowel">
          <span aria-hidden="true">$</span>
          <code>pnpm add dowel</code>
        </div>
      </header>

      <ComponentGallery />
    </main>
  );
}
