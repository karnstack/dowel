import { createFileRoute } from "@tanstack/react-router";
import { Accordion } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/accordion")({
  component: AccordionDocs,
});

function AccordionDocs() {
  return (
    <DocsPage
      title="Accordion"
      lead="A keyboard-accessible group of disclosure panels for dense supporting content."
      toc={[{ id: "default", title: "Grouped disclosures" }]}
    >
      <Section id="default" title="Grouped disclosures">
        <Demo
          layout="stack"
          code={`<Accordion.Root defaultValue={["details"]}>\n  <Accordion.Item value="details">\n    <Accordion.Header>\n      <Accordion.Trigger>Project details</Accordion.Trigger>\n    </Accordion.Header>\n    <Accordion.Panel>\n      <Accordion.Content>Visible to workspace members.</Accordion.Content>\n    </Accordion.Panel>\n  </Accordion.Item>\n</Accordion.Root>`}
        >
          <Accordion.Root defaultValue={["details"]}>
            <Accordion.Item value="details">
              <Accordion.Header>
                <Accordion.Trigger>Project details</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel>
                <Accordion.Content>
                  Visible to workspace members and invited guests.
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="retention">
              <Accordion.Header>
                <Accordion.Trigger>Data retention</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel>
                <Accordion.Content>
                  Deleted records are retained for 30 days.
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>
        </Demo>
      </Section>
    </DocsPage>
  );
}
