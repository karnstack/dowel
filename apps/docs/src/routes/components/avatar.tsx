import { createFileRoute } from "@tanstack/react-router";
import { Avatar } from "@karnstack/dowel";

import { Demo } from "../../components/demo";
import { DocsPage, Section } from "../../components/docs-page";

export const Route = createFileRoute("/components/avatar")({
  component: AvatarDocs,
});

const toc = [
  { id: "fallbacks", title: "Fallbacks" },
  { id: "sizes", title: "Sizes and presence" },
];

function AvatarDocs() {
  return (
    <DocsPage
      title="Avatar"
      lead="A person or organization image with deterministic initials, shape, size, and presence fallbacks."
      toc={toc}
    >
      <Section id="fallbacks" title="Fallbacks">
        <p>
          Pass a name for the accessible label and generated initials. A missing
          or failed image returns to the same fallback automatically.
        </p>
        <Demo
          code={`<Avatar name="Ada Lovelace" />
<Avatar name="Grace Hopper" shape="square" />
<Avatar name="Lin Chen" initials="LC" />`}
        >
          <Avatar name="Ada Lovelace" />
          <Avatar name="Grace Hopper" shape="square" />
          <Avatar name="Lin Chen" initials="LC" />
        </Demo>
      </Section>

      <Section id="sizes" title="Sizes and presence">
        <p>
          Four sizes cover dense rows through prominent profile surfaces.
          Presence becomes part of the avatar's accessible name.
        </p>
        <Demo
          code={`<Avatar name="Ada Lovelace" size="xs" status="online" />
<Avatar name="Grace Hopper" size="sm" status="away" />
<Avatar name="Lin Chen" size="md" status="busy" />
<Avatar name="Sam Rivera" size="lg" status="offline" />`}
        >
          <Avatar name="Ada Lovelace" size="xs" status="online" />
          <Avatar name="Grace Hopper" size="sm" status="away" />
          <Avatar name="Lin Chen" size="md" status="busy" />
          <Avatar name="Sam Rivera" size="lg" status="offline" />
        </Demo>
      </Section>
    </DocsPage>
  );
}
