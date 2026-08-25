import { createFileRoute } from "@tanstack/react-router";
import { Collapsible } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/collapsible")({
  component: CollapsibleDocs,
});

function CollapsibleDocs() {
  return (
    <DocsPage
      title="Collapsible"
      lead="An animated disclosure for one optional region of content."
      toc={[{ id: "default", title: "Disclosure" }]}
    >
      <Section id="default" title="Disclosure">
        <Demo
          layout="stack"
          code={`<Collapsible.Root defaultOpen>\n  <Collapsible.Trigger>Advanced settings</Collapsible.Trigger>\n  <Collapsible.Panel>\n    <Collapsible.Content>Optional configuration.</Collapsible.Content>\n  </Collapsible.Panel>\n</Collapsible.Root>`}
        >
          <Collapsible.Root defaultOpen>
            <Collapsible.Trigger>Advanced settings</Collapsible.Trigger>
            <Collapsible.Panel>
              <Collapsible.Content>
                Configure branch protection and merge automation.
              </Collapsible.Content>
            </Collapsible.Panel>
          </Collapsible.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
