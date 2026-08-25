import { createFileRoute } from "@tanstack/react-router";
import { Field, Input, Textarea } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/input")({
  component: InputDocs,
});

const toc = [
  { id: "sizes", title: "Sizes" },
  { id: "bare", title: "Borderless editing" },
  { id: "textarea", title: "Textarea" },
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
          <code>sm</code> is 24px, <code>md</code> is the 28px workhorse, and{" "}
          <code>lg</code> is 36px for a prominent form. <code>title</code> uses
          larger type for inline title editing. The native <code>size</code>{" "}
          attribute is omitted so Dowel&apos;s visual scale can use the name.
        </p>
        <Demo
          layout="stack"
          code={`import { Input } from "@karnstack/dowel";

<Input name="compact-search" size="sm" placeholder="Search components" />
<Input name="search" placeholder="Search components" />
<Input name="prominent-search" size="lg" placeholder="Search components" />`}
        >
          <Input
            aria-label="Compact search"
            name="compact-search"
            size="sm"
            placeholder="Search components"
          />
          <Input
            aria-label="Search"
            name="search"
            placeholder="Search components"
          />
          <Input
            aria-label="Prominent search"
            name="prominent-search"
            size="lg"
            placeholder="Search components"
          />
        </Demo>
      </Section>

      <Section id="bare" title="Borderless editing">
        <p>
          Use <code>variant=&quot;bare&quot;</code> when the surrounding
          composer is already the surface. The control stays transparent and
          borderless, so hierarchy comes from type and spacing instead of
          another box.
        </p>
        <Demo
          layout="stack"
          code={`<Input
  aria-label="Issue title"
  name="title"
  variant="bare"
  size="title"
  placeholder="Add title"
/>
<Textarea
  aria-label="Issue description"
  name="description"
  variant="bare"
  placeholder="What needs to change, and why?"
/>`}
        >
          <Input
            aria-label="Issue title"
            name="title"
            variant="bare"
            size="title"
            placeholder="Add title"
          />
          <Textarea
            aria-label="Issue description"
            name="description"
            variant="bare"
            placeholder="What needs to change, and why?"
          />
        </Demo>
      </Section>

      <Section id="textarea" title="Textarea">
        <p>
          Textarea shares Input&apos;s surface and bare variants and integrates
          with Field labels, descriptions, validation, and form values.
        </p>
        <Demo
          layout="stack"
          code={`<Field.Root>
  <Field.Label>Release notes</Field.Label>
  <Textarea name="releaseNotes" placeholder="What changed?" />
  <Field.Description>Keep it useful for customers.</Field.Description>
</Field.Root>`}
        >
          <Field.Root>
            <Field.Label>Release notes</Field.Label>
            <Textarea name="releaseNotes" placeholder="What changed?" />
            <Field.Description>Keep it useful for customers.</Field.Description>
          </Field.Root>
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
          code={`import { Field, Input } from "@karnstack/dowel";

<Field.Root>
  <Field.Label>Workspace name</Field.Label>
  <Input name="workspace" placeholder="karnstack" />
  <Field.Description>
    Lowercase letters and dashes only.
  </Field.Description>
</Field.Root>`}
        >
          <Field.Root>
            <Field.Label>Workspace name</Field.Label>
            <Input name="workspace" placeholder="karnstack" />
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
  <Input name="email" invalid defaultValue="not-an-email" />
</Field.Root>

<Input aria-label="Immutable value" name="immutable" disabled defaultValue="Read only" />`}
        >
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input name="email" invalid defaultValue="not-an-email" />
          </Field.Root>
          <Input
            aria-label="Immutable value"
            name="immutable"
            disabled
            defaultValue="Read only"
          />
        </Demo>
      </Section>
    </DocsPage>
  );
}
