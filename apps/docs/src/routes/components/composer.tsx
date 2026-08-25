import { createFileRoute } from "@tanstack/react-router";
import { Button, Composer, PropertyPill } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";
import { CheckIcon, MenuIcon } from "../../components/icons";

export const Route = createFileRoute("/components/composer")({
  component: ComposerDocs,
});

const toc = [
  { id: "complete", title: "Complete composer" },
  { id: "properties", title: "Property pills" },
  { id: "anatomy", title: "Anatomy" },
];

function ComposerDocs() {
  return (
    <DocsPage
      title="Composer"
      lead="A product-grade form shell for creating or editing work without turning every field into another bordered box."
      toc={toc}
    >
      <Section id="complete" title="Complete composer">
        <p>
          The shell provides hierarchy, scrolling, responsive geometry, and
          action regions. Title and description are normal form controls in
          borderless mode, so submission and accessibility stay native.
        </p>
        <Demo
          layout="start"
          code={`import { Button, Composer, PropertyPill } from "@karnstack/dowel";

<Composer.Root aria-label="Create work item" onSubmit={createItem}>
  <Composer.Header>
    <PropertyPill label="Workspace" tone="accent" />
    <Button size="sm" variant="muted">Save draft</Button>
  </Composer.Header>
  <Composer.Body>
    <Composer.Title name="title" placeholder="Add title" />
    <Composer.Description
      name="description"
      placeholder="What needs to change, and why?"
    />
  </Composer.Body>
  <Composer.Properties>
    <PropertyPill label="Triage" />
    <PropertyPill label="Priority" />
    <PropertyPill label="Assignee" />
    <PropertyPill label="Project" />
    <PropertyPill label="Labels" />
  </Composer.Properties>
  <Composer.Footer>
    <PropertyPill label="More actions" />
    <Composer.Actions>
      <Button variant="primary" type="submit">Create item</Button>
    </Composer.Actions>
  </Composer.Footer>
</Composer.Root>`}
        >
          <Composer.Root
            aria-label="Create work item"
            onSubmit={(event) => event.preventDefault()}
          >
            <Composer.Header>
              <PropertyPill
                label="Workspace"
                icon={<CheckIcon />}
                tone="accent"
              />
              <Button size="sm" variant="muted">
                Save draft
              </Button>
            </Composer.Header>
            <Composer.Body>
              <Composer.Title name="title" placeholder="Add title" />
              <Composer.Description
                name="description"
                placeholder="What needs to change, and why?"
              />
              <Composer.Divider />
            </Composer.Body>
            <Composer.Properties>
              <PropertyPill label="Triage" icon={<CheckIcon />} active />
              <PropertyPill label="Priority" />
              <PropertyPill label="Assignee" />
              <PropertyPill label="Project" />
              <PropertyPill label="Labels" />
            </Composer.Properties>
            <Composer.Footer>
              <PropertyPill label="More actions" icon={<MenuIcon />} />
              <Composer.Actions>
                <Button variant="primary" type="submit">
                  Create item
                </Button>
              </Composer.Actions>
            </Composer.Footer>
          </Composer.Root>
        </Demo>
      </Section>

      <Section id="properties" title="Property pills">
        <p>
          PropertyPill is a compact trigger for status, priority, assignee,
          project, labels, dates, and similar metadata. Wrap it with a picker
          primitive when the property is editable.
        </p>
        <Demo
          code={`<PropertyPill label="Status" />
<PropertyPill label="Selected" active />
<PropertyPill label="Workspace" tone="accent" />
<PropertyPill label="Blocked" tone="danger" />`}
        >
          <PropertyPill label="Status" />
          <PropertyPill label="Selected" active />
          <PropertyPill label="Workspace" tone="accent" />
          <PropertyPill label="Blocked" tone="danger" />
        </Demo>
      </Section>

      <Section id="anatomy" title="Anatomy">
        <p>
          Header, Body, Properties, Footer, and Actions are layout contracts.
          Title and Description are the opinionated borderless controls. A
          Divider can separate structured content inside the editing region.
        </p>
      </Section>
    </DocsPage>
  );
}
