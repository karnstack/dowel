import { Link, createFileRoute } from "@tanstack/react-router";
import { Badge, Button, Field, Input, Kbd, Tooltip, IconButton } from "dowel";

import { CodeBlock } from "../components/code-block";
import { ComponentGrid } from "../components/docs-page";
import { ArrowRightIcon, CopyIcon, GitHubIcon } from "../components/icons";
import { versionLabel } from "../lib/version";

export const Route = createFileRoute("/")({
  component: Home,
});

const INSTALL = `pnpm add dowel`;

const USAGE = `import "dowel/dowel.css";
import { Button } from "dowel";

export function Save() {
  return <Button variant="primary">Ship it</Button>;
}`;

const PRINCIPLES = [
  {
    title: "A real package",
    body: "Import components, bump a version, get the fixes. Your UI does not drift across apps, because there is no copy of it in your repo to drift.",
  },
  {
    title: "Opinionated on purpose",
    body: "No per-component override API. className and style are omitted from every prop type and neutralised at runtime, so one look survives contact with a deadline.",
  },
  {
    title: "Light and dark from day one",
    body: "One stylesheet, three activation paths, and an explicit choice that always beats the OS. Retheming is three CSS variables on :root.",
  },
];

function Home() {
  return (
    <div className="docs-landing">
      <section className="docs-hero">
        <div className="docs-hero-copy">
          <Badge tone="accent">Pre-1.0 · MIT</Badge>
          <h1>One look, well made.</h1>
          <p className="docs-lead">
            dowel is an opinionated React component library. Every component
            ships its own appearance and refuses <code>className</code> and{" "}
            <code>style</code>. What you compose is behaviour and content; what
            you get back is one coherent surface.
          </p>
          <div className="docs-hero-actions">
            <Button
              variant="primary"
              nativeButton={false}
              render={<Link to="/components" />}
            >
              Browse components
            </Button>
            <Button
              nativeButton={false}
              render={
                <a
                  href="https://github.com/karnstack/dowel"
                  target="_blank"
                  rel="noreferrer noopener"
                />
              }
            >
              <GitHubIcon size={14} />
              GitHub
            </Button>
          </div>
        </div>

        {/* Not a screenshot: the hero panel is the library, running. */}
        <div className="docs-hero-panel" aria-label="dowel components">
          <div className="docs-hero-panel-bar">
            <span className="docs-hero-dot" />
            <span className="docs-hero-dot" />
            <span className="docs-hero-dot" />
          </div>
          <div className="docs-hero-panel-body">
            <div className="docs-hero-row">
              <Button variant="primary">Ship it</Button>
              <Button>Cancel</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <Field.Root>
              <Field.Label>Workspace</Field.Label>
              <Input defaultValue="karnstack" />
            </Field.Root>
            <div className="docs-hero-row">
              <Badge tone="accent">{versionLabel}</Badge>
              <Badge tone="success">Passing</Badge>
              <Kbd keys={["Meta", "K"]} />
              <Tooltip.Root>
                <Tooltip.Trigger
                  render={
                    <IconButton label="Copy" variant="secondary">
                      <CopyIcon />
                    </IconButton>
                  }
                />
                <Tooltip.Portal>
                  <Tooltip.Positioner>
                    <Tooltip.Popup>Copy</Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2>Install</h2>
        <p className="docs-section-lead">
          One package, one stylesheet, no build config. dowel is ESM-only.
        </p>
        <div className="docs-install">
          <div className="docs-install-side">
            <CodeBlock code={INSTALL} lang="bash" />
            <p className="docs-fineprint">
              dowel ships no typeface — its <code>--dowel-font</code> token
              names <code>Inter Variable</code> first and the app supplies it.
              This site self-hosts it via{" "}
              <code>@fontsource-variable/inter</code>.
            </p>
          </div>
          <CodeBlock code={USAGE} />
        </div>
      </section>

      <section className="docs-section-block">
        <h2>What dowel is</h2>
        <ul className="docs-principles" role="list">
          {PRINCIPLES.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="docs-section-block">
        <h2>Components</h2>
        <p className="docs-section-lead">
          Eight of them. Behaviour comes from Base UI; every one is
          keyboard-tested and axe-checked.
        </p>
        <ComponentGrid />
      </section>

      <footer className="docs-footer">
        <div className="docs-footer-inner">
          <p>
            Built by{" "}
            <a href="https://karngyan.com" target="_blank" rel="noreferrer">
              Karn Gyan
            </a>{" "}
            under karnstack. An homage to the craft of Linear — not affiliated
            with, endorsed by, or sponsored by them.
          </p>
          <Link className="docs-footer-cta" to="/components">
            Browse components
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
