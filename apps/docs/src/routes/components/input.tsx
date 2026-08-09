import { createFileRoute } from "@tanstack/react-router";
import { Field, Input } from "dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/input")({
  component: InputDocs,
});

const toc = [
  { id: "sizes", title: "Sizes" },
  { id: "field", title: "Field" },
  { id: "validation", title: "Validation" },
];

function InputDocs() {
  return (
    <DocsPage
      title="Input"
      lead="A text field, and the Field parts that label and describe it. Field wires the association itself, so no id strings are ever typed twice."
      toc={toc}
    >
      <Section id="sizes" title="Sizes">
        <p>
          <code>md</code> is the 28px control height shared with Button.{" "}
          <code>lg</code> is 36px, for a field that is the point of the screen
          rather than one cell in a dense row. The native <code>size</code>{" "}
          attribute is omitted from the type so dowel&apos;s visual scale can
          take the name.
        </p>
        <Demo
          layout="stack"
          code={`import { Input } from "dowel";

<Input placeholder="Search components" />
<Input size="lg" placeholder="Search components" />`}
        >
          <Input placeholder="Search components" />
          <Input size="lg" placeholder="Search components" />
        </Demo>
      </Section>

      <Section id="field" title="Field">
        <p>
          A dowel <code>Input</code> inside <code>Field.Root</code> is
          associated with its label automatically. <code>Field.Label</code>{" "}
          omits <code>htmlFor</code> on purpose: a hand-written one would win
          over the generated association, which is the exact bug Field exists to
          remove.
        </p>
        <Demo
          layout="stack"
          code={`import { Field, Input } from "dowel";

<Field.Root>
  <Field.Label>Workspace name</Field.Label>
  <Input placeholder="karnstack" />
  <Field.Description>
    Lowercase letters and dashes only.
  </Field.Description>
</Field.Root>`}
        >
          <Field.Root>
            <Field.Label>Workspace name</Field.Label>
            <Input placeholder="karnstack" />
            <Field.Description>
              Lowercase letters and dashes only.
            </Field.Description>
          </Field.Root>
        </Demo>
      </Section>

      <Section id="validation" title="Validation">
        <p>
          <code>invalid</code> sets <code>aria-invalid</code> and turns the
          border to the danger tone. It is applied conditionally, so leaving it
          unset never clobbers an <code>aria-invalid</code> that Field
          validation computed — add <code>Field.Error</code> with a{" "}
          <code>match</code> to surface the message Field computes.
        </p>
        <Demo
          layout="stack"
          code={`<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input invalid defaultValue="not-an-email" />
</Field.Root>

<Input disabled defaultValue="Read only" />`}
        >
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input invalid defaultValue="not-an-email" />
          </Field.Root>
          <Input disabled defaultValue="Read only" />
        </Demo>
      </Section>
    </DocsPage>
  );
}
