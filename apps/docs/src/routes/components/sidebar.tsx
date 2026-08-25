import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/sidebar")({
  component: SidebarDocs,
});

const toc = [
  { id: "layout", title: "Layout" },
  { id: "resize", title: "Resize" },
  { id: "anatomy", title: "Anatomy" },
];

function SidebarExample() {
  return (
    <Sidebar.Root
      className="docs-sidebar-example"
      defaultWidth={176}
      minWidth={144}
      maxWidth={224}
    >
      <Sidebar.Panel aria-label="Example navigation">
        <Sidebar.Header>Acme</Sidebar.Header>
        <Sidebar.Body>
          <nav className="docs-sidebar-example-nav" aria-label="Example">
            <a href="#layout" data-active="">
              Inbox
            </a>
            <a href="#resize">Projects</a>
            <a href="#anatomy">Settings</a>
          </nav>
        </Sidebar.Body>
        <Sidebar.Footer>karn@acme.dev</Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeHandle aria-label="Resize example navigation" />
      <Sidebar.Content>
        <div className="docs-sidebar-example-content">
          <span />
          <span />
          <span />
        </div>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

function SidebarDocs() {
  return (
    <DocsPage
      title="Sidebar"
      lead="An inset application rail with responsive collapse and accessible resizing."
      toc={toc}
    >
      <Section id="layout" title="Layout">
        <p>
          The default inset layout places content on a rounded workspace surface
          over the navigation canvas. The panel collapses below desktop width so
          the application can provide its own mobile disclosure. Use the split
          variant when content should meet the rail.
        </p>
        <Demo
          layout="start"
          code={`import { Sidebar } from "@karnstack/dowel";

<Sidebar.Root defaultWidth={232} minWidth={192} maxWidth={320}>
  <Sidebar.Panel aria-label="Workspace navigation">
    <Sidebar.Header>Acme</Sidebar.Header>
    <Sidebar.Body>{navigation}</Sidebar.Body>
    <Sidebar.Footer>{account}</Sidebar.Footer>
  </Sidebar.Panel>
  <Sidebar.ResizeHandle />
  <Sidebar.Content>{children}</Sidebar.Content>
</Sidebar.Root>`}
        >
          <SidebarExample />
        </Demo>
      </Section>

      <Section id="resize" title="Resize">
        <p>
          Drag the divider, use Left and Right Arrow in eight pixel steps, or
          press Home and End for the configured limits. Double click restores
          the default width.
        </p>
      </Section>

      <Section id="anatomy" title="Anatomy">
        <p>
          Root owns width state. Panel can contain Header, Body, and Footer.
          ResizeHandle exposes separator semantics and current pixel bounds.
          Content always keeps a zero minimum width so dense application views
          can shrink safely.
        </p>
      </Section>
    </DocsPage>
  );
}
