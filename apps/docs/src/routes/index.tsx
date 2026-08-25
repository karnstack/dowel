import { Link, createFileRoute } from "@tanstack/react-router";

import { CodeBlock } from "../components/code-block";
import { ComponentGallery } from "../components/component-gallery";
import { ArrowRightIcon } from "../components/icons";
import { versionLabel } from "../lib/version";

export const Route = createFileRoute("/")({
  component: Home,
});

const USAGE = `import "dowel/dowel.css";
import { Button } from "dowel";

<Button variant="primary">Create</Button>`;

function Home() {
  return (
    <main className="docs-home">
      <section className="docs-intro">
        <div className="docs-intro-copy">
          <p className="docs-intro-meta">React · StyleX · {versionLabel}</p>
          <h1>Components for product interfaces.</h1>
          <p>Compact, accessible, and opinionated. Light and dark included.</p>
        </div>

        <div className="docs-install-command" aria-label="Install dowel">
          <span>$</span>
          <code>pnpm add dowel</code>
        </div>
      </section>

      <ComponentGallery />

      <section className="docs-quickstart" aria-labelledby="quickstart-title">
        <div className="docs-quickstart-copy">
          <h2 id="quickstart-title">Start here</h2>
          <p>Install the package, import the stylesheet once, then compose.</p>
          <Link to="/components">
            Read the component docs
            <ArrowRightIcon size={14} />
          </Link>
        </div>
        <CodeBlock code={USAGE} />
      </section>

      <footer className="docs-footer">
        <p>dowel · MIT</p>
        <div className="docs-footer-links">
          <a href="https://github.com/karnstack/dowel">GitHub</a>
          <a href="https://karngyan.com">Karn Gyan</a>
        </div>
      </footer>
    </main>
  );
}
