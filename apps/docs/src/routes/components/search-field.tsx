import { createFileRoute } from "@tanstack/react-router";
import { Field, Kbd, SearchField } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/search-field")({
  component: SearchFieldDocs,
});

const toc = [
  { id: "default", title: "Repository search" },
  { id: "variants", title: "Sizes and surfaces" },
  { id: "behavior", title: "Behavior" },
];

function SearchFieldDocs() {
  return (
    <DocsPage
      title="Search Field"
      lead="A compact search control for repository lists, command surfaces, filters, and settings."
      toc={toc}
    >
      <Section id="default" title="Repository search">
        <p>
          The shortcut is a visual hint only. Applications own the global
          keyboard listener and focus the field through its forwarded ref.
        </p>
        <Demo
          layout="stack"
          code={`import { Kbd, SearchField } from "@karnstack/dowel";

<SearchField
  aria-label="Search repositories"
  name="repository-search"
  placeholder="Search repositories"
  shortcut={<Kbd keys={["Meta", "K"]} />}
/>`}
        >
          <SearchField
            aria-label="Search repositories"
            name="repository-search"
            placeholder="Search repositories"
            shortcut={<Kbd keys={["Meta", "K"]} />}
          />
        </Demo>
      </Section>

      <Section id="variants" title="Sizes and surfaces">
        <p>
          Use the bare variant when a surrounding command panel or toolbar
          already owns the surface.
        </p>
        <Demo
          layout="stack"
          code={`<SearchField aria-label="Compact search" size="sm" placeholder="Filter branches" />
<SearchField aria-label="Default search" placeholder="Filter branches" />
<SearchField aria-label="Bare search" variant="bare" placeholder="Search commands" />`}
        >
          <SearchField
            aria-label="Compact search"
            size="sm"
            placeholder="Filter branches"
          />
          <SearchField
            aria-label="Default search"
            placeholder="Filter branches"
          />
          <SearchField
            aria-label="Bare search"
            variant="bare"
            placeholder="Search commands"
          />
        </Demo>
      </Section>

      <Section id="behavior" title="Behavior">
        <p>
          Typing reveals a clear action. Escape clears a non-empty field and
          preserves focus. Use <code>value</code> with{" "}
          <code>onValueChange</code>
          for controlled filtering, or <code>defaultValue</code> for local
          state. A Field label is associated automatically.
        </p>
        <Demo
          layout="stack"
          code={`<Field.Root>
  <Field.Label>Find a repository</Field.Label>
  <SearchField name="repository" placeholder="Owner or repository" />
  <Field.Description>Searches repositories you can access.</Field.Description>
</Field.Root>`}
        >
          <Field.Root>
            <Field.Label>Find a repository</Field.Label>
            <SearchField name="repository" placeholder="Owner or repository" />
            <Field.Description>
              Searches repositories you can access.
            </Field.Description>
          </Field.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
