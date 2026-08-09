import { createFileRoute } from "@tanstack/react-router";
import { Kbd } from "dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/kbd")({
  component: KbdDocs,
});

const toc = [
  { id: "keys", title: "Keys" },
  { id: "why-an-array", title: "Why an array" },
];

function KbdDocs() {
  return (
    <DocsPage
      title="Kbd"
      lead="A keyboard shortcut, rendered one cap per key. The keys prop is the only content source — Kbd takes no children."
      toc={toc}
    >
      <Section id="keys" title="Keys">
        <p>
          Each entry becomes its own <code>kbd</code> element at a fixed 17px
          cap, so a two-key shortcut and a four-key shortcut sit on the same
          baseline.
        </p>
        <Demo
          code={`import { Kbd } from "dowel";

<Kbd keys={["Meta", "K"]} />
<Kbd keys={["Ctrl", "Shift", "P"]} />
<Kbd keys={["Esc"]} />`}
        >
          <Kbd keys={["Meta", "K"]} />
          <Kbd keys={["Ctrl", "Shift", "P"]} />
          <Kbd keys={["Esc"]} />
        </Demo>
      </Section>

      <Section id="why-an-array" title="Why an array">
        <p>
          Because a string would put the separator in the caller&apos;s hands,
          and then half the app writes <code>Cmd+K</code> and the other half
          writes <code>Cmd K</code>. <code>children</code> is omitted from{" "}
          <code>KbdProps</code> for the same reason.
        </p>
        <p className="docs-note">
          dowel does not translate key names. <code>Meta</code> renders as
          &quot;Meta&quot;, not as a platform glyph — mapping to the right
          symbol per OS is application knowledge, and it needs the user agent to
          get right.
        </p>
      </Section>
    </DocsPage>
  );
}
