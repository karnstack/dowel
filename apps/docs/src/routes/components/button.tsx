import { createFileRoute } from "@tanstack/react-router";
import { Button } from "dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/button")({
  component: ButtonDocs,
});

const toc = [
  { id: "variants", title: "Variants" },
  { id: "sizes", title: "Sizes" },
  { id: "states", title: "States" },
  { id: "as-a-link", title: "As a link" },
  { id: "props", title: "Props" },
];

function ButtonDocs() {
  return (
    <DocsPage
      title="Button"
      lead="The default control. Four variants, two sizes, and no appearance props — className and style are omitted from the type and neutralised at runtime."
      toc={toc}
    >
      <Section id="variants" title="Variants">
        <p>
          Variant is visual weight, not colour choice. Use one primary per
          screen; everything else is secondary or ghost, and danger is reserved
          for an action that destroys something.
        </p>
        <Demo
          code={`import { Button } from "dowel";

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Demo>
      </Section>

      <Section id="sizes" title="Sizes">
        <p>
          Two, and only two. <code>md</code> is the 28px control height every
          other dowel control shares; <code>sm</code> is 24px for dense rows and
          toolbars.
        </p>
        <Demo
          code={`<Button size="sm">Small</Button>
<Button>Medium</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
        </Demo>
      </Section>

      <Section id="states" title="States">
        <p>
          A disabled button keeps its variant and drops to half opacity. Hover
          derives from the accent, so a retheme carries into it automatically.
        </p>
        <Demo
          code={`<Button variant="primary" disabled>Disabled</Button>
<Button disabled>Disabled</Button>`}
        >
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button disabled>Disabled</Button>
        </Demo>
      </Section>

      <Section id="as-a-link" title="As a link">
        <p>
          Pass an element to <code>render</code> to change the tag. An anchor is
          not a native button, so it needs <code>nativeButton={"{false}"}</code>{" "}
          — Base UI then applies button semantics instead of native-button
          attributes.
        </p>
        <Demo
          code={`<Button
  variant="primary"
  nativeButton={false}
  render={<a href="https://github.com/karnstack/dowel" />}
>
  Open the repo
</Button>`}
        >
          <Button
            variant="primary"
            nativeButton={false}
            render={
              <a
                href="https://github.com/karnstack/dowel"
                target="_blank"
                rel="noreferrer noopener"
              />
            }
          >
            Open the repo
          </Button>
        </Demo>
      </Section>

      <Section id="props" title="Props">
        <div className="docs-table-wrap">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>variant</code>
                </td>
                <td>
                  <code>
                    &quot;primary&quot; | &quot;secondary&quot; |
                    &quot;ghost&quot; | &quot;danger&quot;
                  </code>
                </td>
                <td>
                  <code>&quot;secondary&quot;</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>size</code>
                </td>
                <td>
                  <code>&quot;sm&quot; | &quot;md&quot;</code>
                </td>
                <td>
                  <code>&quot;md&quot;</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>render</code>
                </td>
                <td>
                  <code>ReactElement</code>
                </td>
                <td>—</td>
              </tr>
              <tr>
                <td>
                  <code>nativeButton</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>true</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="docs-note">
          <code>className</code> and <code>style</code> are absent from{" "}
          <code>ButtonProps</code> and neutralised at runtime. If you need a
          different button, dowel is the wrong library — that is the point.
        </p>
      </Section>
    </DocsPage>
  );
}
