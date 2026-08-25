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

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" />
    <path d="M8 7.25v3.5M8 5.25h.01" stroke="currentColor" />
  </svg>
);

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
  icon={<InfoIcon />}
  actions={<Button size="sm">Reconnect</Button>}
>
  Authentication expired for this repository.
</Callout>`}
        >
          <Callout
            title="Mirror paused"
            icon={<InfoIcon />}
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
          separation from ordinary guidance.
        </p>
        <Demo
          layout="stack"
          code={`<Callout tone="success" title="Connected">Repository access is ready.</Callout>
<Callout tone="warning" title="Protected branch">Two approvals are required.</Callout>
<Callout tone="danger" title="Action required">The provider token has expired.</Callout>`}
        >
          <Callout tone="success" title="Connected" icon={<InfoIcon />}>
            Repository access is ready.
          </Callout>
          <Callout tone="warning" title="Protected branch" icon={<InfoIcon />}>
            Two approvals are required.
          </Callout>
          <Callout tone="danger" title="Action required" icon={<InfoIcon />}>
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
