import { Link, createFileRoute } from "@tanstack/react-router";
import { Badge, Button, Kbd } from "dowel";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="docs-main">
      <h1>dowel</h1>
      <p>An opinionated React component library. One look, well made.</p>
      <p>
        Every component ships its own appearance and refuses{" "}
        <code>className</code> and <code>style</code>. What you compose is
        behaviour and content; what you get back is one coherent surface.
      </p>

      <div className="docs-row">
        <Button variant="primary">Ship it</Button>
        <Button>Cancel</Button>
        <Badge tone="accent">v0.1.0</Badge>
        <Kbd keys={["Meta", "K"]} />
      </div>

      <h2>Install</h2>
      <p>
        <code>pnpm add dowel</code>, then import the single stylesheet once:{" "}
        <code>import &quot;dowel/dowel.css&quot;</code>. dowel ships no typeface
        — its <code>--dowel-font</code> token names <code>Inter Variable</code>{" "}
        first, and the app supplies it. This site self-hosts it via{" "}
        <code>@fontsource-variable/inter</code>.
      </p>

      <h2>Components</h2>
      <p>
        <Link to="/components/button">Button</Link> ·{" "}
        <Link to="/components/tooltip">Tooltip</Link>
      </p>
    </main>
  );
}
