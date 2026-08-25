import { createFileRoute } from "@tanstack/react-router";
import { Button, Callout } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/callout")({
  component: CalloutDocs,
});

const toc = [
  { id: "context", title: "Persistent context" },
  { id: "tones", title: "Tones" },
  { id: "semantics", title: "Semantics" },
];

function CalloutDocs() {
  return (
    <DocsPage
      title="Callout"
      lead="Persistent guidance that stays close to the setting, state, or workflow it explains."
      toc={toc}
    >
      <Section id="context" title="Persistent context">
        <p>
          Use Callout when the information should remain visible without
          interrupting the current task. Actions stay compact and secondary.
        </p>
        <Demo
          layout="stack"
          code={`<Callout
  title="Mirror paused"
  actions={<Button size="sm">Reconnect</Button>}
>
  Authentication expired for this repository.
</Callout>`}
        >
          <Callout
            title="Mirror paused"
            actions={<Button size="sm">Reconnect</Button>}
          >
            Authentication expired for this repository.
          </Callout>
        </Demo>
      </Section>

      <Section id="tones" title="Tones">
        <p>
          Tone colors the leading visual, not the entire message. Danger also
          receives a restrained tinted surface because it needs stronger
          separation from ordinary guidance. Each tone supplies a matching
          Heroicon by default. Pass a custom <code>icon</code>, or pass{" "}
          <code>icon={"{null}"}</code> to remove it.
        </p>
        <Demo
          layout="stack"
          code={`<Callout tone="success" title="Connected">Repository access is ready.</Callout>
<Callout tone="warning" title="Protected branch">Two approvals are required.</Callout>
<Callout tone="danger" title="Action required">The provider token has expired.</Callout>`}
        >
          <Callout tone="success" title="Connected">
            Repository access is ready.
          </Callout>
          <Callout tone="warning" title="Protected branch">
            Two approvals are required.
          </Callout>
          <Callout tone="danger" title="Action required">
            The provider token has expired.
          </Callout>
        </Demo>
      </Section>

      <Section id="semantics" title="Semantics">
        <p>
          Callout is a neutral container by default. Add{" "}
          <code>role=status</code>
          only for a polite live update, or <code>role=alert</code> only when an
          urgent message must be announced immediately.
        </p>
      </Section>
    </DocsPage>
  );
}
